import {takeLatest, put, call, select} from 'redux-saga/effects'
import {push} from 'react-router-redux'
import {toastr} from 'react-redux-toastr'
import moment from 'moment'

import {SELF} from '../constants/urls'
import {register, registerSuccess, registerFail} from '../actions/api/employerActions'
import {selToken} from '../selectors/auth'
import EmployersApi from '../api/employers'
import {errorMessageFromApiError, submissionErrorFromApiError} from '../utils/errorUtils'

function* handleRegister({payload: formValues, meta: {resolve, reject}}) {
  const token = yield select(selToken)
  try {
    const data = buildPayload(formValues)
    yield call(EmployersApi.register, token, data)
    yield call(resolve)
    yield put(registerSuccess())
    yield put(push(SELF.registered))
  } catch (e) {
    yield call(reject, submissionErrorFromApiError(e))
    yield call(toastr.error, 'Error', errorMessageFromApiError(e))
    yield put(registerFail())
  }
}

const buildPayload = formValues => ({
  ...formValues,
  birthday: moment(formValues.birthday, 'DD.MM.YYYY').toDate()
})

export default [
  takeLatest(register, handleRegister)
]
