import { createAction } from 'redux-actions'

const login = createAction('API__AUTH__LOGIN')
const loginSuccess = createAction('API__AUTH__LOGIN_SUCCESS')
const loginFail = createAction('API__AUTH__LOGIN_FAIL')

const loadAuth = createAction('API__AUTH__LOAD')

const logout = createAction('API__AUTH__LOGOUT')

export {
  login, loginSuccess, loginFail,
  loadAuth,
  logout
}
