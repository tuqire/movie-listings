import mapEntitiesById from './index'

describe('helpers/mapEntitiesById', () => {
  it('returns entities if are is not an array', () => {
    expect(mapEntitiesById('foo')).toBe('foo')
    expect(mapEntitiesById({ foo: true })).toEqual({ foo: true })
    expect(mapEntitiesById(null)).toBe(null)
  })

  it('returns mapped entities', () => {
    expect(mapEntitiesById([{
      id: 'foo',
      name: 'test'
    }, {
      id: 'bar',
      name: 'test'
    }])).toEqual({
      foo: {
        id: 'foo',
        name: 'test'
      },
      bar: {
        id: 'bar',
        name: 'test'
      }
    })
  })
})
