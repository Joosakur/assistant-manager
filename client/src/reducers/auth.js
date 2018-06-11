import {handleActions} from 'redux-actions'

import {loadAuth, login, loginSuccess} from '../actions/authActions'
import {getSelfSuccess} from '../actions/api/employerActions'

const initialState = {
  token: undefined,
  authenticating: false
}

const reduceLoadAuth = state => {
  return {
    ...state,
    authenticating: true
  }
}

const reduceLogin = state => {
  return {
    ...state,
    authenticating: true
  }
}

const reduceLoginSuccess = (state, {payload: token}) => {
  return {
    ...state,
    token
  }
}

const reduceGetSelfSuccess = state => {
  return {
    ...state,
    authenticating: false
  }
}

const authReducer = handleActions({
  [loadAuth]: reduceLoadAuth,
  [login]: reduceLogin,
  [loginSuccess]: reduceLoginSuccess,
  [getSelfSuccess]: reduceGetSelfSuccess
}, initialState)

export default authReducer
