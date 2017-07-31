import * as types from "../constants/actionTypes";

export function getWorkShiftsBegin() {
  return {type: types.GET_WORK_SHIFTS_BEGIN};
}

export function getWorkShiftsSuccess(workShifts) {
  return {type: types.GET_WORK_SHIFTS_SUCCESS, workShifts};
}

export function getWorkShiftsError() {
  return {type: types.GET_WORK_SHIFTS_ERROR};
}

export function startWorkShiftEdit(target) {
  return {type: types.EDIT_WORK_SHIFT_START, target};
}

export function endWorkShiftEdit() {
  return {type: types.EDIT_WORK_SHIFT_END};
}

export function submitWorkShiftBegin() {
  return {type: types.SUBMIT_WORK_SHIFT_BEGIN};
}

export function submitWorkShiftSuccess(workShift) {
  return {type: types.SUBMIT_WORK_SHIFT_SUCCESS, workShift};
}

export function submitWorkShiftError() {
  return {type: types.SUBMIT_WORK_SHIFT_ERROR};
}

