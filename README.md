
<h1 align="center">json</h1>
<div align="center">
  <strong>Nicer JSON parse and stringify</strong>
</div>
<div align="center">
  <a href="https://npmjs.org/package/@tiaanduplessis/json">
    <img src="https://img.shields.io/npm/v/@tiaanduplessis/json.svg?style=flat-square" alt="npm package version" />
  </a>
  <a href="https://npmjs.org/package/@tiaanduplessis/json">
  <img src="https://img.shields.io/npm/dm/@tiaanduplessis/json.svg?style=flat-square" alt="npm downloads" />
  </a>
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="standard JS linter" />
  </a>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square" alt="prettier code formatting" />
  </a>
  <a href="https://travis-ci.org/tiaanduplessis/json">
    <img src="https://img.shields.io/travis/tiaanduplessis/json.svg?style=flat-square" alt="travis ci build status" />
  </a>
  <a href="https://github.com/tiaanduplessis/json/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@tiaanduplessis/json.svg?style=flat-square" alt="project license" />
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="make a pull request" />
  </a>
</div>
<br>
<div align="center">
  <a href="https://github.com/tiaanduplessis/json/watchers">
    <img src="https://img.shields.io/github/watchers/tiaanduplessis/json.svg?style=social" alt="Github Watch Badge" />
  </a>
  <a href="https://github.com/tiaanduplessis/json/stargazers">
    <img src="https://img.shields.io/github/stars/tiaanduplessis/json.svg?style=social" alt="Github Star Badge" />
  </a>
  <a href="https://twitter.com/intent/tweet?text=Check%20out%20json!%20https://github.com/tiaanduplessis/json%20%F0%9F%91%8D">
    <img src="https://img.shields.io/twitter/url/https/github.com/tiaanduplessis/json.svg?style=social" alt="Tweet" />
  </a>
</div>
<br>
<div align="center">
  Built with ❤︎ by <a href="https://github.com/tiaanduplessis">tiaanduplessis</a> and <a href="https://github.com/tiaanduplessis/json/contributors">contributors</a>
</div>

<h2>Table of Contents</h2>
<details>
  <summary>Table of Contents</summary>
  <li><a href="#about">About</a></li>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>

## About

A Tiny wrapper around [parse-json](https://www.npmjs.com/package/parse-json) and [fast-safe-stringify](https://github.com/davidmarkclements/fast-safe-stringify) to bundle them together and add support for handling parse errors via a callback.

## Install

```sh
$ npm install @tiaanduplessis/json
# OR
$ yarn add @tiaanduplessis/json
```

## Usage

```js
import JSON from '@tiaanduplessis/json'

const obj = { foo: 5, baz: 5, bar: 7 }
const str = '{"foo": "5"}'
const badStr = '{foo: "5"}'

console.log(JSON.stringify(obj)) // "{"foo":5,"baz":5,"bar":7}"

JSON.parse(str, (error, result) => {
  console.log(error, result) // null { foo: '5' }
})

JSON.parse(badStr, (error, result) => {
  console.log(error, result)
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
})

```

## Contributing

Contributions are welcome!

1. Fork it.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

Or open up [a issue](https://github.com/tiaanduplessis/json/issues).

## License

Licensed under the MIT License.
