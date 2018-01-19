// @flow
import path from 'path';
import { createMacro } from 'babel-plugin-macros';
import gqlTag from 'graphql-tag';
import serialize from 'babel-literal-to-ast';
import expandImports from './utils/expandImports';
import compileWithFragment from './utils/compileWithFragment';
// import printAST from 'ast-pretty-print';
// console.log(printAST(referencePath.parentPath))

function graphqlTagMacro({
  references,
  state: { file: { opts: { filename } } },
  babel: { types: t },
}: {
  references: { gql: Array<any>, loader: Array<any> },
  state: { file: { opts: { filename: string } } },
  babel: { types: Object },
}): void {
  const { gql = [], loader = [] } = references;

  // Case 1: import { gql } from 'graphql-tag.macro'.
  gql.forEach(referencePath => {
    const compiled = compileWithFragment(referencePath, t);
    referencePath.parentPath.replaceWith(compiled);
  });

  // Case 2: import { loader } from 'graphql-tag.macro'
  loader.forEach(referencePath => {
    referencePath.parentPath.node.arguments.forEach(({ value }) => {
      const queryPath = path.join(filename, '..', value);
      const expanded = expandImports(queryPath); // Note: #import feature
      referencePath.parentPath.replaceWith(serialize(gqlTag(expanded)));
    });
  });
}

export default createMacro(graphqlTagMacro);
