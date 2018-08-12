import { errorOccured } from './index'
import { ERROR_OCCURRED } from '../../actions'

describe('store/action-creators/errors', () => {
  describe('#errorOccured', () => {
    it('returns correct action', () => {
      const action = errorOccured([{ foo: true, bar: true }])
      
      expect(action).toEqual({
        type: ERROR_OCCURRED,
        payload: [{ foo: true, bar: true }]
      })
    })
  })
})
