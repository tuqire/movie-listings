import { combineReducers } from 'redux'

import errors from './errors'
import genres from './genres'
import movies from './movies'

export default combineReducers({
  errors,
  genres,
  movies
})
