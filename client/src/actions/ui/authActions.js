import { createAction } from 'redux-actions'

const loadAuth = createAction('UI__AUTH__LOAD')
const logout = createAction('UI__AUTH__LOGOUT')

export {
  loadAuth,
  logout
}
