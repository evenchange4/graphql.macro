// @flow
import gqlTag from 'graphql-tag';
import serialize from 'babel-literal-to-ast';

/**
 * ref: https://github.com/leoasis/graphql-tag.macro
 */
export default function compileWithFragment(
  referencePath: Object,
  t: Object,
): Object {
  const source = referencePath.parentPath.node.quasi.quasis
    .map(node => node.value.raw)
    .join('');
  const compiled = serialize(gqlTag(source));
  const expressions = referencePath.parentPath.get('quasi').get('expressions');
  if (expressions && expressions.length) {
    const definitionsProperty = compiled.properties.find(
      p => p.key.value === 'definitions',
    );
    const definitionsArray = definitionsProperty.value;
    const concatDefinitions = expressions.map(expression =>
      t.memberExpression(expression.node, t.identifier('definitions')),
    );
    definitionsProperty.value = t.callExpression(
      t.memberExpression(definitionsArray, t.identifier('concat')),
      concatDefinitions,
    );
  }

  return compiled;
}
