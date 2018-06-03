import {takeLatest, put, call} from 'redux-saga/effects'
import {toastr} from 'react-redux-toastr'

import {verifyRegistration, verifyRegistrationSuccess, verifyRegistrationFail} from '../actions/api/employerActions'
import EmployersApi from '../api/employers'
import {errorMessageFromApiError} from '../utils/errorUtils'

function* handleVerifyRegistration({payload: verificationToken}) {
  try {
    yield call(EmployersApi.verifyRegistration, verificationToken)
    yield put(verifyRegistrationSuccess())
  } catch (e) {
    const errorMsg = errorMessageFromApiError(e)
    yield call(toastr.error, 'Failed to verify email', errorMsg)
    yield put(verifyRegistrationFail(errorMsg))
  }
}

export default [
  takeLatest(verifyRegistration, handleVerifyRegistration)
]
