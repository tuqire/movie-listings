import * as ACTIONS from '../../actions'
import reducer, { defaultState } from './index'

describe('store/reducers/errors', () => {
  describe('if no state set', () => {
    it('returns default state', () => {
      const state = reducer(undefined, {})
  
      expect(state).toEqual(defaultState)
    })
  })

  describe('if unrecognised action', () => {
    it('returns old state', () => {
      const state = reducer('foo', {
        type: 'FOO_ACTION'
      })
  
      expect(state).toEqual('foo')
    })
  })

  describe('if `ERROR_OCCURRED` action', () => {
    it('returns error state', () => {
      const state = reducer('foo', {
        type: ACTIONS.ERROR_OCCURRED,
        payload: {
          message: 'error message'
        }
      })
  
      expect(state).toEqual({
        isError: true,
        errorMessages: 'error message'
      })
    })
  })
})
