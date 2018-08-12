import axios from 'axios'
import { getGenres, saveGenres } from './index'

import * as actionCreators from '../index'
import { SAVE_GENRES } from '../../actions'

jest.mock('axios', () => ({
  get: jest.fn(() => ({
    data: {
      genres: [
        { ba_r: 'bar', foo: 'foo', foo_bar: 'foo' },
        { bar: 'bar' }
      ]
    }
  }))
}))

jest.mock('../index', () => ({
  errorOccured: jest.fn((() => 'errorOccured'))
}))

describe('store/action-creators/genres', () => {
  let dispatchMock

  beforeEach(() => {
    dispatchMock = jest.fn()
    console.error = jest.fn()
  })

  describe('#getGenres', () => {
    it('tries to fetch genres from api', () => {
      getGenres()(dispatchMock)
      expect(axios.get).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`)
    })

    describe('on success', () => {
      beforeEach(async () => {
        await getGenres()(dispatchMock)
      })

      it('doesnt dispatch `errorOccured` action', () => {
        expect(actionCreators.errorOccured).not.toHaveBeenCalled()
      })
  
      it('dispatches `saveGenres` action with returned listings', () => {
        expect(dispatchMock).toHaveBeenCalledWith(saveGenres([
          { baR: 'bar', foo: 'foo', fooBar: 'foo' },
          { bar: 'bar' }
        ]))
      })
    })

    describe('on failure', () => {
      beforeEach(async () => {
        axios.get.mockReturnValueOnce(Promise.reject(new Error('getGenres failure')))
        await getGenres()(dispatchMock)
      })

      it('logs error', () => {
        expect(console.error).toHaveBeenCalled()
      })

      it('doesnt dispatch `saveGenres` action', () => {
        expect(dispatchMock).not.toHaveBeenCalledWith(saveGenres([
          { baR: 'bar', foo: 'foo', fooBar: 'foo' },
          { bar: 'bar' }
        ]))
      })

      it('dispatches `errorOccured` action', () => {
        expect(actionCreators.errorOccured).toHaveBeenCalledWith(new Error('getGenres failure'))
      })
    })
  })

  describe('#saveGenres', () => {
    it('returns correct action', () => {
      const action = saveGenres([{ foo: true, bar: true }])
      
      expect(action).toEqual({
        type: SAVE_GENRES,
        payload: {
          genres: [{ foo: true, bar: true }]
        }
      })
    })
  })
})
