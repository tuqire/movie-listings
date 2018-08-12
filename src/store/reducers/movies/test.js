import * as ACTIONS from '../../actions'
import reducer, { defaultState } from './index'

describe('store/reducers/movies', () => {
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

  describe('if `SAVE_CINEMA_LISTINGS` action', () => {
    it('returns mapped listings', () => {
      const state = reducer({}, {
        type: ACTIONS.SAVE_CINEMA_LISTINGS,
        payload: {
          movies: [{
            id: 'foo',
            name: 'action'
          }, {
            id: 'bar',
            name: 'adventure'
          }],
          meta: {}
        }
      })
  
      expect(state.data).toEqual({
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

    it('returns correct meta', () => {
      let state = reducer({}, {
        type: ACTIONS.SAVE_CINEMA_LISTINGS,
        payload: {
          movies: [],
          meta: {
            page: 3,
            totalPages: 10,
            totalResults: 11
          }
        }
      })
  
      expect(state.meta).toEqual({
        page: 3,
        totalPages: 10,
        totalResults: 11
      })

      state = reducer({
        meta: { page: 5 }
      }, {
        type: ACTIONS.SAVE_CINEMA_LISTINGS,
        payload: {
          movies: [],
          meta: {
            totalPages: 10,
            totalResults: 11
          }
        }
      })
  
      expect(state.meta).toEqual({
        page: 5,
        totalPages: 10,
        totalResults: 11
      })
    })
  })
})
