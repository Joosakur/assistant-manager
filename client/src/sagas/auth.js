import {takeLatest, put, call} from "redux-saga/effects"
import {push} from 'react-router-redux'
import {amplify} from 'amplifyjs/individual/amplify.store'

import {login, loginSuccess, loginFail, logout, loadAuth} from '../actions/authActions'
import {postLogin} from '../api/auth'
import {SubmissionError} from "redux-form"
import {formErrorFromApiError} from "../utils/errorUtils"
import {SELF} from "../constants/urls"
import {getSelf} from "../actions/api/employerActions"

function* handleLogin({payload: {email, password}, meta: {resolve, reject}}) {
  try {
    const response = yield call(postLogin, email, password)
    resolve()
    const token = response.data.token
    console.log(token)
    amplify.store('token', token)
    yield put(loginSuccess(token))
    yield put(getSelf())
    yield put(push(SELF.assistants))
  } catch (e) {
    let error = formErrorFromApiError(e)
    reject(new SubmissionError(error))
    yield put(loginFail(error))
  }
}

function* handleLoadAuth() {
  let token = amplify.store('token')
  if(token) {
    yield put(loginSuccess(token))
    yield put(getSelf())
  } else console.warn('no token found')
}

function* handleLogout() {
  console.log('logout')
  amplify.store('token', null)
  yield put(push(SELF.login))
}

export default [
  takeLatest(login, handleLogin),
  takeLatest(logout, handleLogout),
  takeLatest(loadAuth, handleLoadAuth)
]
