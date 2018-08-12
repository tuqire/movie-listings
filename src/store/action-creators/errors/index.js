import { ERROR_OCCURRED } from '../../actions'

export const errorOccured = err => ({
  type: ERROR_OCCURRED,
  payload: err
})
