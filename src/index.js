const stringify = require('fast-json-stringify')
const parseJSON = require('parse-json')

const JSON = {
  stringify,
  parse (json, reviver, filename, cb) {
    if (arguments.length === 2) {
      cb = reviver
      reviver = null
    }

    try {
      const result = parseJSON(json, reviver, filename)
      cb(null, result)
    } catch (error) {
      cb(error)
    }
  }
}

export default JSON
