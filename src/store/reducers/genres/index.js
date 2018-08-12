import * as ACTIONS from '../../actions'
import mapEntitiesById from '../../../helpers/mapEntitiesById'

export const defaultState = {}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.SAVE_GENRES:      
      return mapEntitiesById(action.payload.genres)

    default:
      return state
  }
}
