import JSON from '../src'

test('should provide stringify and parse functions', () => {
  expect(JSON).toBeDefined()
  expect(JSON.parse).toBeDefined()
  expect(JSON.stringify).toBeDefined()
})

test('should pass parse result to callback', () => {
  const str = '{"foo": "5"}'

  JSON.parse(str, (error, result) => {
    expect(error).toBeFalsy()
    expect(result).toBeTruthy()
  })
})
