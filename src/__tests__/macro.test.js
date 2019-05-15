// @flow

import pluginTester from 'babel-plugin-tester';
import plugin from 'babel-plugin-macros';
import fs from 'fs';
import path from 'path';

expect.addSnapshotSerializer({
  print(val) {
    return val.replace(/..\/macro/, 'graphql.macro');
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
    '[loader] with absolute path': {
      error: false,
      code: `
        import { loader } from '../macro';
        const query = loader('src/__tests__/fixtures/simpleFragment.graphql');
      `,
    },
    '[loader] with absolute path and NODE_PATH': {
      error: false,
      code: `
        import { loader } from '../macro';
        const query = loader('__tests__/fixtures/simpleFragment.graphql');
      `,
      setup: () => {
        process.env.NODE_PATH = 'src/';
      },
    },
    '[loader] with absolute path and jsconfig include property': {
      error: false,
      code: `
        import { loader } from '../macro';
        const query = loader('__tests__/fixtures/simpleFragment.graphql');
      `,
      setup: () => {
        fs.symlinkSync(
          'src/__tests__/fixtures/jsconfig.json',
          path.resolve(fs.realpathSync(process.cwd()), 'jsconfig.json'),
          'file',
        );
      },
      teardown: () => {
        fs.unlinkSync(
          path.resolve(fs.realpathSync(process.cwd()), 'jsconfig.json'),
        );
      },
    },
    '[loader] with nested circular fragments': {
      error: false,
      code: `
        import { loader } from '../macro';
        const query = loader('./fixtures/query3.graphql');
      `,
    },
    '[loader] should work with relative path issue#52': {
      error: false,
      code: `
        import { loader } from '../macro';
        const query = loader('../__tests__/fixtures/query.graphql');
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
