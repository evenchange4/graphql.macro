import pluginTester from 'babel-plugin-tester';
import plugin from 'babel-plugin-macros';

expect.addSnapshotSerializer({
  print(val) {
    return val.replace(/..\/macro/, 'graphql-tag.macro');
  },
  test(val) {
    return typeof val === 'string';
  },
});

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {
    filename: __filename,
  },
  tests: {
    '[gql]': {
      error: false,
      code: `
        import { gql } from '../macro';
        const query = gql\`
          {
            user(id: 5) {
              firstName
              lastName
            }
          }
        \`;
      `,
    },
    '[loader]': {
      error: false,
      code: `
        import { loader } from '../macro';
        const query = loader('./fixtures/query1.graphql');
      `,
    },
    // '[loader] multiple operations': {
    //   error: false,
    //   code: `
    //     import { loader } from '../macro';
    //     const { User, Post } = loader('./fixtures/query2.graphql');
    //   `,
    // },
  },
});
