
# @tiaanduplessis/json
[![package version](https://img.shields.io/npm/v/@tiaanduplessis/json.svg?style=flat-square)](https://npmjs.org/package/@tiaanduplessis/json)
[![package downloads](https://img.shields.io/npm/dm/@tiaanduplessis/json.svg?style=flat-square)](https://npmjs.org/package/@tiaanduplessis/json)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/@tiaanduplessis/json.svg?style=flat-square)](https://npmjs.org/package/@tiaanduplessis/json)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Standard JS](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![travis ci](https://img.shields.io/travis/tiaanduplessis/json.svg?style=flat-square)](hhttps://travis-ci.org/tiaanduplessis/json)
[![Greenkeeper badge](https://badges.greenkeeper.io/tiaanduplessis/json.svg)](https://greenkeeper.io/)

> Promisified & memoized [parse-json](https://www.npmjs.com/package/parse-json) & [fast-safe-stringify](https://github.com/davidmarkclements/fast-safe-stringify) bundled together

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#License)

## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com). 

```sh
$ npm install @tiaanduplessis/json
$ # OR
$ yarn add @tiaanduplessis/json
```

## Usage

```js
import JSON from '@tiaanduplessis/json'

const obj = { foo: 5, baz: 5, bar: 7 }
const str = '{"foo": "5"}'
const badStr = '{foo: "5"}'

console.log(JSON.stringify(obj)) // "{"foo":5,"baz":5,"bar":7}"

JSON.parse(str).then(console.log).catch(error) // { foo: '5' }

JSON.parse(badStr).then(console.log).catch(console.error)
  /*
  { JSONError: Unexpected token 'f' at 1:2
  {foo: "5"}
  ^
      at module.exports (/Users/Tiaan/Workspace/json/node_modules/parse-json/index.js:27:17)
      at Object.parse (/Users/Tiaan/Workspace/json/src/index.js:13:22)
      at Object.<anonymous> (/Users/Tiaan/Workspace/json/src/index.js:33:6)
      at Module._compile (module.js:569:30)
      at Object.Module._extensions..js (module.js:580:10)
      at Module.load (module.js:503:32)
      at tryModuleLoad (module.js:466:12)
      at Function.Module._load (module.js:458:3)
      at Function.Module.runMain (module.js:605:10)
      at startup (bootstrap_node.js:158:16) name: 'JSONError' } undefined
  */
```

## Contribute

1. Fork it and create your feature branch: git checkout -b my-new-feature
2. Commit your changes: git commit -am 'Add some feature'
3. Push to the branch: git push origin my-new-feature 
4. Submit a pull request

## License

MIT
    