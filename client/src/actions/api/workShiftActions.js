import { createAction } from 'redux-actions'

const createWorkShift = createAction('API__WORK_SHIFTS__CREATE')
const createWorkShiftSuccess = createAction('API__WORK_SHIFTS__CREATE_SUCCESS')
const createWorkShiftFail = createAction('API__WORK_SHIFTS__CREATE_FAIL')

const listWorkShifts = createAction('API__WORK_SHIFTS__LIST')
const listWorkShiftsSuccess = createAction('API__WORK_SHIFTS__LIST_SUCCESS')
const listWorkShiftsFail = createAction('API__WORK_SHIFTS__LIST_FAIL')

const updateWorkShift = createAction('API__WORK_SHIFTS__UPDATE')
const updateWorkShiftSuccess = createAction('API__WORK_SHIFTS__UPDATE_SUCCESS')
const updateWorkShiftFail = createAction('API__WORK_SHIFTS__UPDATE_FAIL')

const deleteWorkShift = createAction('API__WORK_SHIFTS__DELETE')
const deleteWorkShiftSuccess = createAction('API__WORK_SHIFTS__DELETE_SUCCESS')
const deleteWorkShiftFail = createAction('API__WORK_SHIFTS__DELETE_FAIL')

const pasteDay = createAction('API__WORK_SHIFTS__PASTE_DAY')

export {
  createWorkShift, createWorkShiftSuccess, createWorkShiftFail,
  listWorkShifts, listWorkShiftsSuccess, listWorkShiftsFail,
  updateWorkShift, updateWorkShiftSuccess, updateWorkShiftFail,
  deleteWorkShift, deleteWorkShiftSuccess, deleteWorkShiftFail,
  pasteDay
}
