import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function reportingReducer(state = initialState.reporting, action) {
  switch (action.type) {
    case types.POST_REPORT_BEGIN:
      return Object.assign({}, state, {submitting: true, polling: false, downloadLink: undefined});
    case types.POST_REPORT_SUCCESS:
      return Object.assign({}, state, {submitting: false, polling: true, downloadLink: undefined});
    case types.POST_REPORT_ERROR:
      return Object.assign({}, initialState.reporting);
    case types.GET_REPORT_SUCCESS:
      return Object.assign({}, state, {submitting: false, polling: false, downloadLink: action.downloadLink});
    case types.GET_REPORT_ERROR:
      return Object.assign({}, initialState.reporting);
    case types.RESET_REPORT:
      return Object.assign({}, initialState.reporting);
    default:
      return state;
  }
}
