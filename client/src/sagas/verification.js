import {takeLatest, put, call} from 'redux-saga/effects'

import {verifyRegistration, verifyRegistrationSuccess, verifyRegistrationFail} from '../actions/api/employerActions'
import EmployersApi from '../api/employers'
import {errorMessageFromApiError} from '../utils/errorUtils'

function* handleVerifyRegistration({payload: verificationToken}) {
  try {
    yield call(EmployersApi.verifyRegistration, verificationToken)
    yield put(verifyRegistrationSuccess())
  } catch (e) {
    const errorMsg = errorMessageFromApiError(e)
    yield put(verifyRegistrationFail(errorMsg))
  }
}

export default [
  takeLatest(verifyRegistration, handleVerifyRegistration)
]
