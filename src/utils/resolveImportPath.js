// @flow
import path from 'path';
import fs from 'fs';

const CONFIG_FILENAMES = ['jsconfig.json', 'tsconfig.json'];
const CMD = fs.realpathSync(process.cwd());

const configPaths = CONFIG_FILENAMES.map(filename =>
  path.resolve(CMD, filename),
).filter(actPath => fs.existsSync(actPath));
let jsconfigInclude;
if (configPaths.length === 1) {
  const jsconfig = JSON.parse(fs.readFileSync(configPaths[0], 'utf8'));
  jsconfigInclude = jsconfig.include ? jsconfig.include[0] : null;
} else if (configPaths.length > 1) {
  throw new Error(
    'You have both a tsconfig.json and a jsconfig.json. If you are using TypeScript please remove your jsconfig.json file.',
  );
}

const resolveImportPath = ({
  filename,
  relativePath,
}: {
  filename: string,
  relativePath: string,
}): string => {
  if (relativePath.startsWith('.')) {
    return path.join(filename, '..', relativePath);
  }

  const resolvedPath = path.resolve(
    CMD,
    jsconfigInclude || process.env.NODE_PATH || '.',
    relativePath,
  );
  if (fs.existsSync(resolvedPath)) {
    return resolvedPath;
  }

  // Note: Try to resolve from node_modules if the file does not exist. PR#39
  return path.resolve(CMD, 'node_modules', relativePath);
};

export default resolveImportPath;
