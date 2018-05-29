import JSON from '../src'

test('should provide stringify and parse functions', () => {
  expect(JSON).toBeDefined()
  expect(JSON.parse).toBeDefined()
  expect(JSON.stringify).toBeDefined()
})

test('should return promise with result', async () => {
  const str = '{"foo": "5"}'
  const result = await JSON.parse(str)
  expect(result).toBeDefined()
  expect(result.foo).toBe('5')
})


test('should reject if invalid json', () => {
  const str = '{"foo": "5"'
  expect(JSON.parse(str)).rejects.toThrowError()
})

test('should get preparsed string from cache', async () => {
  const str = '{"foo": "5"}'
  await JSON.parse(str)
  const result = await JSON.parse(str)
  expect(result).toBeDefined()
  expect(result.foo).toBe('5')
})