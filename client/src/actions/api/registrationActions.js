import { createAction } from 'redux-actions'

const register = createAction('API__REGISTRATION__SUBMIT')
const registerSuccess = createAction('API__REGISTRATION__SUBMIT_SUCCESS')
const registerFail = createAction('API__REGISTRATION__SUBMIT_FAIL')

export {
  register, registerSuccess, registerFail
}
