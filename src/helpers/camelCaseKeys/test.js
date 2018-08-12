import camelCaseRecursive from 'camelcase-keys-recursive'
import camelCaseKeys from './index'

jest.mock('camelcase-keys-recursive')

describe('helpers/camelCaseKeys', () => {
  it('returns result of `camelCaseRecursive`', () => {
    camelCaseRecursive.mockReturnValue('foo')

    const output = camelCaseKeys('bar')

    expect(camelCaseRecursive).toHaveBeenCalledWith('bar')
    expect(output).toBe('foo')
  })
})
