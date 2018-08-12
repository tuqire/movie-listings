import * as ACTIONS from '../../actions'
import reducer, { defaultState } from './index'

describe('store/reducers/genres', () => {
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

  describe('if `SAVE_GENRES` action', () => {
    it('returns mapped state', () => {
      const state = reducer('foo', {
        type: ACTIONS.SAVE_GENRES,
        payload: {
          genres: [{
            id: 'foo',
            name: 'action'
          }, {
            id: 'bar',
            name: 'adventure'
          }]
        }
      })
  
      expect(state).toEqual({
        foo: {
          id: 'foo',
          name: 'action'
        },
        bar: {
          id: 'bar',
          name: 'adventure'
        }
      })
    })
  })
})
