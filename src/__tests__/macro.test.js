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
    '[gql] without fragment': {
      error: false,
      code: `
        import { gql } from '../macro';
        const query = gql\`
          query User {
            user(id: 5) {
              lastName
              ...UserEntry1
            }
          }
        \`;
      `,
    },
    '[gql] with fragment': {
      error: false,
      code: `
        import { gql } from '../macro';
        const userFragment = gql\`
          fragment UserEntry1 on User {
            firstName
          }
        \`;
        const query = gql\`
          query User {
            user(id: 5) {
              lastName
              ...UserEntry1
            }
          }
          $\{userFragment}
        \`;
      `,
    },
    '[loader] without fragment': {
      error: false,
      code: `
        import { loader } from '../macro';
        const query = loader('./fixtures/query.graphql');
      `,
    },
    '[loader] with fragment': {
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
