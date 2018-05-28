import * as types from "../constants/actionTypes"
import initialState from "../initialState"

export default function scheduleReducer(state = initialState.schedule, action) {
  switch (action.type) {
    case types.EDIT_WORK_SHIFT_START:
      return Object.assign({}, state, {target: action.target || null, editing: true})
    case types.EDIT_WORK_SHIFT_END:
      return Object.assign({}, state, {editing: false})
    case types.SUBMIT_WORK_SHIFT_BEGIN:
      return Object.assign({}, state, {submitting: true})
    case types.SUBMIT_WORK_SHIFT_SUCCESS:
      return Object.assign({}, state, {submitting: false})
    case types.SUBMIT_WORK_SHIFT_ERROR:
      return Object.assign({}, state, {submitting: false})
    case types.DELETE_WORK_SHIFT_BEGIN:
      return Object.assign({}, state, {submitting: true})
    case types.DELETE_WORK_SHIFT_SUCCESS:
      return Object.assign({}, state, {submitting: false})
    case types.DELETE_WORK_SHIFT_ERROR:
      return Object.assign({}, state, {submitting: false})
    case types.COPY_DAY:
      return Object.assign({}, state, {copiedDay: action.date})
    default:
      return state
  }
}
