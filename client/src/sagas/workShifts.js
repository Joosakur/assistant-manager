import {takeLatest, put, call, select} from 'redux-saga/effects'
import {toastr} from 'react-redux-toastr'
import moment from 'moment'

import {
  listWorkShifts, listWorkShiftsSuccess, listWorkShiftsFail,
  createWorkShift, createWorkShiftSuccess, createWorkShiftFail,
  updateWorkShift, updateWorkShiftSuccess, updateWorkShiftFail,
  deleteWorkShift, deleteWorkShiftSuccess, deleteWorkShiftFail,
  pasteDay
} from '../actions/api/workShiftActions'
import {closeWorkShiftModal} from '../actions/ui/workShiftActions'
import WorkShiftsApi from '../api/workShifts'
import {selToken} from '../selectors/auth'
import {selCopiedDay} from '../selectors/pages/schedule'
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

const buildPayload = form => {
  const start = moment(form.startDate, "D.M.YYYY").hours(form.startTimeHours).minutes(form.startTimeMinutes)
  const end = moment(form.startDate, "D.M.YYYY")
  const startTimeHours = parseInt(form.startTimeHours)
  const startTimeMinutes = parseInt(form.startTimeMinutes)
  const endTimeHours = parseInt(form.endTimeHours)
  const endTimeMinutes = parseInt(form.endTimeMinutes)

  if(endTimeHours === 24) {
    end.add(1, "days").hours(0)
  }
  else {
    end.hours(endTimeHours).minutes(endTimeMinutes)
    const endTimeBeforeStartTime = endTimeHours < startTimeHours ||
      (endTimeHours === startTimeHours && endTimeMinutes < startTimeMinutes)
    if(endTimeBeforeStartTime)
      end.add(1, "days")
  }

  return {
    assistantId: form.assistant === "Unassigned" ? null : form.assistant,
    start: start.format("YYYY-MM-DDTHH:mm:ss"),
    end: end.format("YYYY-MM-DDTHH:mm:ss"),
    sick: form.sick
  }
}

function* handleDeleteWorkShift({payload: workShiftId}) {
  const token = yield select(selToken)
  try {
    yield call(WorkShiftsApi.deleteWorkShift, token, workShiftId)
    yield put(deleteWorkShiftSuccess(workShiftId))
    yield put(closeWorkShiftModal())
  } catch (e) {
    toastr.error('Error', generalErrorFromApiError(e))
    yield put(deleteWorkShiftFail())
  }
}

function* handlePasteDay({payload: targetDate}) {
  const token = yield select(selToken)
  const sourceDate = yield select(selCopiedDay)

  const from = moment(sourceDate).format('YYYY-MM-DD')
  const to = moment(targetDate).format('YYYY-MM-DD')
  try {
    const response = yield call(WorkShiftsApi.pasteDay, token, from, to)
    for (const workShift of response.data) {
      yield put(createWorkShiftSuccess(workShift))
    }
  } catch (e) {
    toastr.error('Error', generalErrorFromApiError(e))
  }
}

export default [
  takeLatest(listWorkShifts, handleListWorkShifts),
  takeLatest(createWorkShift, handleCreateWorkShift),
  takeLatest(updateWorkShift, handleUpdateWorkShift),
  takeLatest(deleteWorkShift, handleDeleteWorkShift),
  takeLatest(pasteDay, handlePasteDay)
]
