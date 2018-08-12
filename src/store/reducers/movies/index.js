import * as ACTIONS from '../../actions'
import mapEntitiesById from '../../../helpers/mapEntitiesById'

export const defaultState = {
  data: {},
  meta: {
    page: null,
    totalPages: null,
    totalResults: null
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.SAVE_CINEMA_LISTINGS:
      return {
        data: mapEntitiesById(action.payload.movies),
        meta: {
          ...state.meta,
          ...action.payload.meta
        }
      }

    default:
      return state
  }
}
