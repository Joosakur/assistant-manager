import { createAction } from 'redux-actions'

const login = createAction('AUTH__LOGIN', payload => payload, (payload, meta) => meta)
const loginSuccess = createAction('AUTH__LOGIN_SUCCESS')
const loginFail = createAction('AUTH__LOGIN_FAIL')

const loadAuth = createAction('AUTH__LOAD')
const logout = createAction('AUTH__LOGOUT')

export {
  login,
  loginSuccess,
  loginFail,
  loadAuth,
  logout
}
