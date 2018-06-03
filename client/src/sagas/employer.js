import {takeLatest, put, call, select} from 'redux-saga/effects'

import {getSelf, getSelfSuccess} from '../actions/api/employerActions'
import EmployerApi from '../api/employers'
import {logout} from '../actions/authActions'
import {selToken} from '../selectors/auth'

function* handleGetUserData() {
  const token = yield select(selToken)
  try {
    const response = yield call(EmployerApi.getSelf, token)
    yield put(getSelfSuccess(response.data))
  } catch (e) {
    yield put(logout())
  }
}

export default [
  takeLatest(getSelf, handleGetUserData),
]
