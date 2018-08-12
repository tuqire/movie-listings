import axios from 'axios'
import { getCinemaListings, saveCinemaListings } from './index'

import * as actionCreators from '../index'
import { SAVE_CINEMA_LISTINGS } from '../../actions'

jest.mock('axios', () => ({
  get: jest.fn(() => ({
    data: {
      results: [
        { ba_r: 'bar', foo: 'foo', foo_bar: 'foo' },
        { bar: 'bar' }
      ],
      page: 5,
      total_pages: 10,
      total_results: 20
    }
  }))
}))

jest.mock('../index', () => ({
  errorOccured: jest.fn((() => 'errorOccured')),
  getGenres: jest.fn((() => 'getGenres'))
}))

describe('store/action-creators/movies', () => {
  let dispatchMock

  beforeEach(() => {
    dispatchMock = jest.fn()
    console.error = jest.fn()
  })

  describe('#getCinemaListings', () => {
    it('dispatches get genre action', () => {
      getCinemaListings()(dispatchMock)
      expect(dispatchMock).toHaveBeenCalledWith(actionCreators.getGenres())
    })

    describe('tries to fetch cinema listings from api', () => {
      it('when no page number provided defaults to 1', () => {
        getCinemaListings()(dispatchMock)
        expect(axios.get).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`)
      })

      it('when page number uses it', () => {
        getCinemaListings({ pageNum: 5 })(dispatchMock)
        expect(axios.get).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=5`)
      })
    })

    describe('on success', () => {
      beforeEach(async () => {
        await getCinemaListings()(dispatchMock)
      })

      it('doesnt dispatch `errorOccured` action', () => {
        expect(actionCreators.errorOccured).not.toHaveBeenCalled()
      })
  
      it('dispatches `saveCinemaListings` action with returned listings', () => {
        expect(dispatchMock).toHaveBeenCalledWith(saveCinemaListings({
          movies: [
            { baR: 'bar', foo: 'foo', fooBar: 'foo' },
            { bar: 'bar' }
          ],
          meta: {
            page: 5,
            totalPages: 10,
            totalResults: 20
          }
        }))
      })
    })

    describe('on failure', () => {
      beforeEach(async () => {
        axios.get.mockReturnValueOnce(Promise.reject(new Error('getCinemaListings failure')))
        await getCinemaListings()(dispatchMock)
      })

      it('logs error', () => {
        expect(console.error).toHaveBeenCalled()
      })

      it('doesnt dispatch `saveCinemaListings` action', () => {
        expect(dispatchMock).not.toHaveBeenCalledWith(saveCinemaListings([
          { baR: 'bar', foo: 'foo', fooBar: 'foo' },
          { bar: 'bar' }
        ]))
      })

      it('dispatches `errorOccured` action', () => {
        expect(actionCreators.errorOccured).toHaveBeenCalledWith(new Error('getCinemaListings failure'))
      })
    })
  })

  describe('#saveCinemaListings', () => {
    it('returns correct action', () => {
      const action = saveCinemaListings([{ foo: true, bar: true }])
      
      expect(action).toEqual({
        type: SAVE_CINEMA_LISTINGS,
        payload: [{ foo: true, bar: true }]
      })
    })
  })
})
