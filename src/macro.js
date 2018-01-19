// @flow
import path from 'path';
import { createMacro } from 'babel-plugin-macros';
import gqlTag from 'graphql-tag';
import serialize from 'babel-literal-to-ast';
import expandImports from './utils/expandImports';
// import printAST from 'ast-pretty-print';
// console.log(printAST(referencePath.parentPath))

function graphqlTagMacro({
  references,
  state: { file: { opts: { filename } } },
}: {
  references: { gql: Array<any>, loader: Array<any> },
  state: { file: { opts: { filename: string } } },
}): void {
  const { gql = [], loader = [] } = references;

  // Case 1: import { gql } from 'graphql-tag.macro'
  gql.forEach(referencePath => {
    const { raw } = referencePath.parentPath.node.quasi.quasis[0].value;
    referencePath.parentPath.replaceWith(serialize(gqlTag(raw)));
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
