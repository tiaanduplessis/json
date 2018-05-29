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