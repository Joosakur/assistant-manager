import {takeLatest, put, call, select} from 'redux-saga/effects'
import {toastr} from "react-redux-toastr"
import moment from "moment/moment"

import {
  getSelf, getSelfSuccess,
  updateEmployer, updateEmployerSuccess, updateEmployerFail
} from '../actions/api/employerActions'
import EmployersApi from '../api/employers'
import {logout} from '../actions/authActions'
import {selToken} from '../selectors/auth'
import {submissionErrorFromApiError, errorMessageFromApiError} from "../utils/errorUtils"
import s from "../localization"

function* handleGetUserData() {
  const token = yield select(selToken)
  try {
    const response = yield call(EmployersApi.getSelf, token)
    yield put(getSelfSuccess(response.data))
  } catch (e) {
    yield put(logout())
  }
}

function* handleUpdate({payload: formValues, meta: {resolve, reject}}) {
  const token = yield select(selToken)
  try {
    const data = buildPayload(formValues)
    const { data: employer } = yield call(EmployersApi.update, token, data)
    yield call(resolve)
    yield put(updateEmployerSuccess(employer))
    yield call(toastr.success, 'Käyttäjätietosi on päivitetty')
  } catch (e) {
    yield call(reject, submissionErrorFromApiError(e))
    yield call(toastr.error, s.signUp.error, errorMessageFromApiError(e))
    yield put(updateEmployerFail())
  }
}

const buildPayload = formValues => ({
  ...formValues,
  birthday: moment(formValues.birthday, 'D.M.YYYY').format('YYYY-MM-DD')
})

export default [
  takeLatest(getSelf, handleGetUserData),
  takeLatest(updateEmployer, handleUpdate)
]
