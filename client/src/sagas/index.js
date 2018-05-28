import { all } from 'redux-saga/effects'

import authSagas from './auth'
import employerSagas from './employer'
import assistantSagas from './assistants'
import workShiftSagas from './workShifts'

export default function* root() {
  yield all([
    ...authSagas,
    ...employerSagas,
    ...assistantSagas,
    ...workShiftSagas
  ])
}
