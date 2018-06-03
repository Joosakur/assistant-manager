import { createAction } from 'redux-actions'

const getSelf = createAction('API__EMPLOYERS__GET_SELF')
const getSelfSuccess = createAction('API__EMPLOYERS__GET_SELF_SUCCESS')
const getSelfFail = createAction('API__EMPLOYERS__GET_SELF_FAIL')

const register = createAction('API__REGISTRATION__SUBMIT', payload => payload, (payload, meta) => meta)
const registerSuccess = createAction('API__REGISTRATION__SUBMIT_SUCCESS')
const registerFail = createAction('API__REGISTRATION__SUBMIT_FAIL')

const verifyRegistration = createAction('API__REGISTRATION__VERIFY')
const verifyRegistrationSuccess = createAction('API__REGISTRATION__VERIFY_SUCCESS')
const verifyRegistrationFail = createAction('API__REGISTRATION__VERIFY_FAIL')

export {
  getSelf, getSelfSuccess, getSelfFail,
  register, registerSuccess, registerFail,
  verifyRegistration, verifyRegistrationSuccess, verifyRegistrationFail
}
