import axios from 'axios'

import camelCaseKeys from '../../../helpers/camelCaseKeys'

import { getGenres, errorOccured } from './../index'
import { SAVE_CINEMA_LISTINGS } from '../../actions'

export const getCinemaListings = ({ pageNum = 1 } = {}) => async dispatch => {
  dispatch(getGenres())

  try {
    const { data } = await axios.get(`${process.env.API_BASE_URL}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${pageNum}`)

    dispatch(saveCinemaListings({
      movies: camelCaseKeys(data.results),
      meta: {
        page: data.page,
        totalPages: data.total_pages,
        totalResults: data.total_results
      }
    }))
  } catch (err) {
    console.error(err)
    dispatch(errorOccured(err))
  }
}

export const saveCinemaListings = payload => ({
  type: SAVE_CINEMA_LISTINGS,
  payload: payload
})
