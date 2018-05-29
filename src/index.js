const stringify = require('fast-safe-stringify')
const parseJSON = require('parse-json')

let parsed = new Map()

const JSON = {
  stringify,
  parse (json, reviver, filename) {
    if (parsed.has(json)) {
      return Promise.resolve(parsed.get(json))
    }

    return new Promise((resolve, reject) => {
      try {
        const result = parseJSON(json, reviver, filename)
        parsed.set(json, result)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default JSON
