import axios from 'axios'

import camelCaseKeys from '../../../helpers/camelCaseKeys'

import { errorOccured } from './../index'
import { SAVE_GENRES } from '../../actions'

export const getGenres = () => async dispatch => {
  try {
    const { data: { genres } } = await axios.get(`${process.env.API_BASE_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`)

    dispatch(saveGenres(camelCaseKeys(genres)))
  } catch (err) {
    console.error(err)
    dispatch(errorOccured(err))
  }
}

export const saveGenres = genres => ({
  type: SAVE_GENRES,
  payload: { genres }
})

