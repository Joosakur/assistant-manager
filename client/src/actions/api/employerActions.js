import { createAction } from 'redux-actions'

const getSelf = createAction('API__EMPLOYERS__GET_SELF')
const getSelfSuccess = createAction('API__EMPLOYERS__GET_SELF_SUCCESS')
const getSelfFail = createAction('API__EMPLOYERS__GET_SELF_FAIL')

export {
  getSelf, getSelfSuccess, getSelfFail
}
