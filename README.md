# graphql.macro

> Compile GraphQL AST at build-time with babel-plugin-macros.

[![Travis][build-badge]][build]
[![Codecov Status][codecov-badge]][codecov]
[![npm package][npm-badge]][npm]
[![npm downloads][npm-downloads]][npm]

[![Dependency Status][dependency-badge]][dependency]
[![devDependency Status][devdependency-badge]][devdependency]
[![peerDependency Status][peerdependency-badge]][peerdependency]

[![prettier][prettier-badge]][prettier]
[![license][license-badge]][license]

## Installation

```sh
$ yarn add graphql.macro
```

_Note: You'll need to install and configure [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros) if you haven't already. (This can be omitted when using CRA [react-script@2.x](https://github.com/facebookincubator/create-react-app/issues/3815) .)_

## Example

[evenchange4/graphql.macro-example (with react-script@2.x)](https://github.com/evenchange4/graphql.macro-example) [[DEMO](https://graphqlmacro.netlify.com/)]

## Usage

### `loader`

```js
import { loader } from 'graphql.macro';
const query = loader('./fixtures/query.graphql');

      ↓ ↓ ↓ ↓ ↓ ↓

const query = {
  "kind": "Document",
  "definitions": [{
    ...
```

### `gql`

```diff
-import gql from 'graphql-tag';
+import { gql } from 'graphql.macro';

const query = gql`
  query User {
    user(id: 5) {
      lastName
      ...UserEntry1
    }
  }
`;

      ↓ ↓ ↓ ↓ ↓ ↓

const query = {
  "kind": "Document",
  "definitions": [{
    ...
```

## Alternative

* [Webpack preprocessing with graphql/loader](https://github.com/apollographql/graphql#webpack-preprocessing-with-graphqlloader)
* [Babel preprocessing](https://github.com/apollographql/graphql#babel-preprocessing)
* https://github.com/leoasis/graphql-tag.macro

## Development

### Requirements

* node >= 9.4.0
* yarn >= 1.3.2

```sh
$ yarn install --pure-lockfile
```

## Test

```sh
$ yarn run format
$ yarn run eslint
$ yarn run flow
$ yarn run test:watch
$ yarn run build
```

---

## CONTRIBUTING

* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests.

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)

MIT: [http://michaelhsu.mit-license.org](http://michaelhsu.mit-license.org)

[build-badge]: https://img.shields.io/travis/evenchange4/graphql.macro/master.svg?style=flat-square
[build]: https://travis-ci.org/evenchange4/graphql.macro
[npm-badge]: https://img.shields.io/npm/v/graphql.macro.svg?style=flat-square
[npm]: https://www.npmjs.org/package/graphql.macro
[codecov-badge]: https://img.shields.io/codecov/c/github/evenchange4/graphql.macro.svg?style=flat-square
[codecov]: https://codecov.io/github/evenchange4/graphql.macro?branch=master
[npm-downloads]: https://img.shields.io/npm/dt/graphql.macro.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/graphql.macro.svg?style=flat-square
[license]: http://michaelhsu.mit-license.org/
[dependency-badge]: https://david-dm.org/evenchange4/graphql.macro.svg?style=flat-square
[dependency]: https://david-dm.org/evenchange4/graphql.macro
[devdependency-badge]: https://david-dm.org/evenchange4/graphql.macro/dev-status.svg?style=flat-square
[devdependency]: https://david-dm.org/evenchange4/graphql.macro#info=devDependencies
[peerdependency-badge]: https://david-dm.org/evenchange4/graphql.macro/peer-status.svg?style=flat-square
[peerdependency]: https://david-dm.org/evenchange4/graphql.macro#info=peerDependencies
[prettier-badge]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square
[prettier]: https://github.com/prettier/prettier
