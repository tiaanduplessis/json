import source from '../src'
import commonjs from '../dist/json'
import module from '../dist/json.m'
import umd from '../dist/json.umd'

const implementations = { source, commonjs, module, umd }

Object.keys(implementations).forEach(name => {
  const JSONWrapper = implementations[name]

  describe(`${name} revivers`, () => {
    test('uses each reviver for identical JSON text', async () => {
      const text = '{"different":1}'
      const first = await JSONWrapper.parse(text, (key, value) => key === 'different' ? 2 : value)
      const second = await JSONWrapper.parse(text, (key, value) => key === 'different' ? 3 : value)
      expect(first).toEqual({ different: 2 })
      expect(second).toEqual({ different: 3 })
    })

    test('runs the same stateful reviver on every call', async () => {
      const text = '{"stateful":1}'
      let calls = 0
      const reviver = (key, value) => key === 'stateful' ? ++calls : value
      expect(await JSONWrapper.parse(text, reviver)).toEqual({ stateful: 1 })
      expect(await JSONWrapper.parse(text, reviver)).toEqual({ stateful: 2 })
      expect(calls).toBe(2)
    })

    test('does not cache a result returned by a reviver', async () => {
      const text = '{"reviverFirst":1}'
      const transformed = await JSONWrapper.parse(text, (key, value) => key === 'reviverFirst' ? 2 : value)
      const ordinary = await JSONWrapper.parse(text)
      expect(transformed).toEqual({ reviverFirst: 2 })
      expect(ordinary).toEqual({ reviverFirst: 1 })
      expect(await JSONWrapper.parse(text)).toBe(ordinary)
    })

    test('bypasses an ordinary cached result without replacing it', async () => {
      const text = '{"ordinaryFirst":1}'
      const ordinary = await JSONWrapper.parse(text)
      const transformed = await JSONWrapper.parse(text, (key, value) => key === 'ordinaryFirst' ? 2 : value)
      expect(transformed).toEqual({ ordinaryFirst: 2 })
      expect(ordinary).toEqual({ ordinaryFirst: 1 })
      expect(await JSONWrapper.parse(text)).toBe(ordinary)
    })

    test('revivers receive fresh values even if an ordinary cached object was mutated', async () => {
      const text = '{"mutated":1}'
      const ordinary = await JSONWrapper.parse(text)
      ordinary.mutated = 99
      expect(await JSONWrapper.parse(text, (key, value) => value)).toEqual({ mutated: 1 })
      expect(await JSONWrapper.parse(text)).toBe(ordinary)
      expect(ordinary.mutated).toBe(99)
    })

    test('preserves native traversal, holders and deletion after cache population', async () => {
      const text = '{"nested":{"keep":1,"remove":2},"items":[3,4]}'
      const ordinary = await JSONWrapper.parse(text)
      const expectedVisits = []
      const actualVisits = []
      const makeReviver = visits => function (key, value) {
        visits.push([key, Array.isArray(this), Object.prototype.hasOwnProperty.call(this, key)])
        if (key === 'remove' || key === '0') return undefined
        return typeof value === 'number' ? value * 2 : value
      }
      const expected = JSON.parse(text, makeReviver(expectedVisits))
      const actual = await JSONWrapper.parse(text, makeReviver(actualVisits))
      expect(actual).toEqual(expected)
      expect(actualVisits).toEqual(expectedVisits)
      expect(Object.prototype.hasOwnProperty.call(actual.items, 0)).toBe(Object.prototype.hasOwnProperty.call(expected.items, 0))
      expect(ordinary).toEqual(JSON.parse(text))
      expect(await JSONWrapper.parse(text)).toBe(ordinary)
    })

    ;[undefined, null, false, 0, 'replacement', { replacement: true }].forEach((replacement, index) => {
      test(`preserves root replacement ${index} without caching it`, async () => {
        const text = `{"root":${index}}`
        let calls = 0
        const reviver = (key, value) => {
          if (key !== '') return value
          calls++
          return replacement
        }
        expect(await JSONWrapper.parse(text, reviver)).toBe(replacement)
        expect(await JSONWrapper.parse(text)).toEqual({ root: index })
        expect(await JSONWrapper.parse(text, reviver)).toBe(replacement)
        expect(calls).toBe(2)
      })
    })

    test('keeps memoization for non-function revivers', async () => {
      const text = '{"nonFunction":1}'
      const ordinary = await JSONWrapper.parse(text)
      for (const reviver of [undefined, null, false, 0, {}, 'input.json']) {
        expect(await JSONWrapper.parse(text, reviver)).toBe(ordinary)
      }
    })

    test('returns rejected promises for a throwing reviver even after an ordinary cache hit', async () => {
      const text = '{"throwing":1}'
      const reviver = () => { throw new Error('reviver failure') }
      for (let attempt = 0; attempt < 2; attempt++) {
        const result = JSONWrapper.parse(text, reviver, 'reviver.json')
        expect(result).toBeInstanceOf(Promise)
        await expect(result).rejects.toMatchObject({ name: 'JSONError', fileName: 'reviver.json' })
        await expect(result).rejects.toThrow('reviver failure')
        expect(await JSONWrapper.parse(text)).toEqual({ throwing: 1 })
      }
    })

    test('preserves invalid JSON rejection and both filename forms', async () => {
      const text = '{"invalid":'
      const reviver = (key, value) => value
      for (const args of [[text, reviver, 'first.json'], [text, null, 'second.json'], [text, 'third.json']]) {
        const result = JSONWrapper.parse(...args)
        expect(result).toBeInstanceOf(Promise)
        await expect(result).rejects.toMatchObject({ name: 'JSONError', fileName: args[2] || args[1] })
      }
    })

    test('keeps stringify behavior', () => {
      const value = { keep: 1 }
      value.self = value
      expect(JSONWrapper.stringify(value)).toBe('{"keep":1,"self":"[Circular]"}')
    })
  })
})
