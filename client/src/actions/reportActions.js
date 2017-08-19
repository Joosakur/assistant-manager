import * as types from "../constants/actionTypes";

export function postReportBegin() {
  return {type: types.POST_REPORT_BEGIN};
}

export function postReportSuccess(id) {
  return {type: types.POST_REPORT_SUCCESS, id};
}

export function postReportError(error) {
  return {type: types.POST_REPORT_ERROR, error};
}

export function getReportSuccess(downloadLink) {
  return {type: types.GET_REPORT_SUCCESS, downloadLink};
}

export function getReportError(error) {
  return {type: types.GET_REPORT_ERROR, error};
}

export function resetReport() {
  return {type: types.RESET_REPORT};
}

