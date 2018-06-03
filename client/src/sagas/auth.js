import {takeLatest, put, call} from 'redux-saga/effects'
import {push} from 'react-router-redux'
import {amplify} from 'amplifyjs/individual/amplify.store'

import {login, loginSuccess, loginFail, logout, loadAuth} from '../actions/authActions'
import {postLogin} from '../api/auth'
import {submissionErrorFromApiError} from '../utils/errorUtils'
import {SELF} from '../constants/urls'
import {getSelf} from '../actions/api/employerActions'

function* handleLogin({payload: {email, password}, meta: {resolve, reject}}) {
  try {
    const response = yield call(postLogin, email, password)
    yield call(resolve)
    const token = response.data.token
    yield call(amplify.store, 'token', token)
    yield put(loginSuccess(token))
    yield put(getSelf())
    yield put(push(SELF.assistants))
  } catch (e) {
    yield call(reject, submissionErrorFromApiError(e))
    yield put(loginFail())
  }
}

function* handleLoadAuth() {
  const token = amplify.store('token')
  if(token) {
    yield put(loginSuccess(token))
    yield put(getSelf())
  }
}

function* handleLogout() {
  amplify.store('token', null)
  yield put(push(SELF.login))
}

export default [
  takeLatest(login, handleLogin),
  takeLatest(logout, handleLogout),
  takeLatest(loadAuth, handleLoadAuth)
]
