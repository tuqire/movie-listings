import * as ACTIONS from '../../actions'

export const defaultState = {
  isError: false,
  errorMessages: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.ERROR_OCCURRED:
      return {
        isError: true,
        errorMessages: action.payload.message
      }

    default:
      return state
  }
}
