import { all } from 'redux-saga/effects'

import authSagas from './auth'
import employerSagas from './employer'
import assistantSagas from './assistants'
import workShiftSagas from './workShifts'
import registrationSagas from './registration'
import verificationSagas from './verification'
import reportingSagas from './reporting'

export default function* root() {
  yield all([
    ...authSagas,
    ...employerSagas,
    ...assistantSagas,
    ...workShiftSagas,
    ...registrationSagas,
    ...verificationSagas,
    ...reportingSagas
  ])
}
