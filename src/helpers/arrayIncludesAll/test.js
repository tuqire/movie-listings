import arrayIncludesall from './index'

describe('helpers/arrayIncludesall', () => {
  it('returns false if either array is missing', () => {
    expect(arrayIncludesall(['foo'])).toBe(false)
    expect(arrayIncludesall(undefined, ['foo'])).toBe(false)
  })

  it('returns false if either argument is not an array', () => {
    expect(arrayIncludesall(['foo'], 'foo')).toBe(false)
    expect(arrayIncludesall('foo', ['foo'])).toBe(false)
  })

  it('return true if all entries in first array are found in the second array', () => {
    let doesArrayIncludesall = arrayIncludesall(['bar'], ['bar'])
    expect(doesArrayIncludesall).toBe(true)

    doesArrayIncludesall = arrayIncludesall(['foo', 'bar'], ['bar', 'foo'])
    expect(doesArrayIncludesall).toBe(true)

    doesArrayIncludesall = arrayIncludesall(['foo', 'bar'], ['foo', 'foobar', 'bar'])
    expect(doesArrayIncludesall).toBe(true)
  })

  it('return false if all entries in first array are not found in the second array', () => {
    let doesArrayIncludesall = arrayIncludesall(['foo', 'bar', 'foobar'], ['foo', 'bar'])
    expect(doesArrayIncludesall).toBe(false)

    doesArrayIncludesall = arrayIncludesall(['foo'], ['bar', 'foobar'])
    expect(doesArrayIncludesall).toBe(false)
  })
})
