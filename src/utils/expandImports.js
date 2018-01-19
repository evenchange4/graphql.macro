// @flow
import path from 'path';
import fs from 'fs';

export default function expandImports(queryPath: string): string {
  const source = fs.readFileSync(queryPath, 'utf8');
  const lines = source.split(/\r\n|\r|\n/);
  const importContent = lines
    .filter(line => line[0] === '#' && line.slice(1).split(' ')[0] === 'import')
    .map(line => {
      const value = line
        .slice(1)
        .split(' ')[1]
        .replace(/('|")/g, '');
      const relativeQueryPath = path.join(queryPath, '..', value);
      const raw = fs.readFileSync(relativeQueryPath, 'utf8');

      return raw;
    })
    .join('');

  return importContent + source;
}
