// @flow
import path from 'path';
import fs from 'fs';
import { createMacro } from 'babel-plugin-macros';
import gqlTag from 'graphql-tag';
import serialize from 'babel-literal-to-ast';
import expandImports from './utils/expandImports';
import compileWithFragment from './utils/compileWithFragment';
// import printAST from 'ast-pretty-print';
// console.log(printAST(referencePath.parentPath))

const cwd = fs.realpathSync(process.cwd());
const resolvePathFromCwd = relativePath => {
  const resolvedPath = path.resolve(
    cwd,
    process.env.NODE_PATH || '.',
    relativePath,
  );
  return fs.exists(resolvedPath, (exists) => {
    if (exists) {
      return resolvedPath;
    }
    return path.resolve(cwd, 'node_modules', relativePath);
  });
};

function graphqlMacro({
  references,
  state: { file: { opts: { filename } } },
  babel: { types: t },
}: {
  references: { gql: Array<any>, loader: Array<any> },
  state: { file: { opts: { filename: string } } },
  babel: { types: Object },
}): void {
  const { gql = [], loader = [] } = references;

  // Case 1: import { gql } from 'graphql.macro'.
  gql.forEach(referencePath => {
    const compiled = compileWithFragment(referencePath, t);
    referencePath.parentPath.replaceWith(compiled);
  });

  // Case 2: import { loader } from 'graphql.macro'
  loader.forEach(referencePath => {
    referencePath.parentPath.node.arguments.forEach(({ value }) => {
      const queryPath = value.startsWith('./')
        ? path.join(filename, '..', value)
        : resolvePathFromCwd(value);
      const expanded = expandImports(queryPath); // Note: #import feature
      referencePath.parentPath.replaceWith(serialize(gqlTag(expanded)));
    });
  });
}

export default createMacro(graphqlMacro);
