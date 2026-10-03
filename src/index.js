const stringify = require('fast-safe-stringify')
const parseJSON = require('parse-json')

const parsed = new Map()

const JSON = {
  stringify,
  parse (json, reviver, filename) {
    const cacheable = typeof reviver !== 'function'
    if (cacheable && parsed.has(json)) {
      return Promise.resolve(parsed.get(json))
    }

    return new Promise((resolve, reject) => {
      try {
        const result = parseJSON(json, reviver, filename)
        if (cacheable) parsed.set(json, result)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default JSON
