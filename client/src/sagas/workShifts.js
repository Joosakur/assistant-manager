import {takeLatest, put, call, select} from 'redux-saga/effects'
import {toastr} from 'react-redux-toastr'

import {
  listWorkShifts, listWorkShiftsSuccess, listWorkShiftsFail,
  createWorkShift, createWorkShiftSuccess, createWorkShiftFail,
  updateWorkShift, updateWorkShiftSuccess, updateWorkShiftFail
} from '../actions/api/workShiftActions'
import WorkShiftsApi from '../api/workShifts'
import {selToken} from '../selectors/auth'
import {generalErrorFromApiError} from '../utils/errorUtils'

export function* handleListWorkShifts({payload: {from, to, assistantId}}) {
  const token = yield select(selToken)
  try {
    const response = yield call(WorkShiftsApi.listWorkShifts, token, {from, to, assistantId})
    yield put(listWorkShiftsSuccess(response.data))
  } catch (e) {
    toastr.error('Error', generalErrorFromApiError(e))
    yield put(listWorkShiftsFail())
  }
}

function* handleCreateWorkShift({payload: formValues}) {
  const token = yield select(selToken)
  try {
    const data = buildPayload(formValues)
    const response = yield call(WorkShiftsApi.createWorkShift, token, data)
    yield put(createWorkShiftSuccess(response.data))
  } catch (e) {
    toastr.error('Error', generalErrorFromApiError(e))
    yield put(createWorkShiftFail())
  }
}

function* handleUpdateWorkShift({payload: formValues}) {
  const token = yield select(selToken)
  const {workShiftId} = formValues
  if (!(workShiftId && workShiftId.length > 0))
    return put(updateWorkShiftFail('Missing workShiftId to update'))

  try {
    const data = buildPayload(formValues)
    const response = yield call(WorkShiftsApi.updateWorkShift, token, workShiftId, data)
    yield put(updateWorkShiftSuccess(response.data))
  } catch (e) {
    toastr.error('Error', generalErrorFromApiError(e))
    yield put(createWorkShiftFail())
  }
}

const buildPayload = formValues => {
  const payload = {

  }
  // todo
  return payload
}

export default [
  takeLatest(listWorkShifts, handleListWorkShifts),
  takeLatest(createWorkShift, handleCreateWorkShift),
  takeLatest(updateWorkShift, handleUpdateWorkShift)
]
