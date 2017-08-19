import {API, SELF} from '../constants/urls';
import {push} from 'react-router-redux';
import {toastr} from 'react-redux-toastr';
import axios from 'axios';
import {formErrorFromApiError, generalErrorFromApiError} from "../utils/errorUtils";
import {
  deleteWorkShiftBegin,
  deleteWorkShiftError,
  deleteWorkShiftSuccess,
  endWorkShiftEdit,
  getWorkShiftsBegin, getWorkShiftsError, getWorkShiftsSuccess,
  submitWorkShiftBegin, submitWorkShiftError, submitWorkShiftSuccess
} from "../actions/workShiftActions";
import SubmissionError from "redux-form/es/SubmissionError";
import moment from "moment";

export function getWorkShifts(fromDate, toDate, assistantId) {
  return function (dispatch, getState) {
    dispatch(getWorkShiftsBegin());
    if(!assistantId && !getState().login.authenticated) {
      dispatch(push(SELF.login));
      toastr.error("Error", "Please login");
    }

    return axios.get(API.origin+API.workShifts, {
      headers: {'Authorization': getState().login.token},
      params: {'from': fromDate, 'to': toDate, assistantId}
    })
      .then((response) => {
        dispatch(getWorkShiftsSuccess(response.data));
      })
      .catch(e => {
        let error = generalErrorFromApiError(e);
        dispatch(getWorkShiftsError());
        toastr.error("Error", error);
      });
  };
}

export function deleteWorkShift(id) {
  return function (dispatch, getState) {
    dispatch(deleteWorkShiftBegin());

    return axios({
      url: API.origin+API.workShifts+"/"+id,
      method: 'delete',
      headers: {'Authorization': getState().login.token}
    })
      .then(() => {
        dispatch(deleteWorkShiftSuccess(id));
        dispatch(endWorkShiftEdit());
        toastr.success('Deleted');
      })
      .catch(e => {
        let error = formErrorFromApiError(e);
        dispatch(deleteWorkShiftError(error));
        toastr.error("Error", error._error);
      });
  };
}

export function sendWorkShiftEdit(form) {
  return function (dispatch, getState) {
    dispatch(submitWorkShiftBegin());

    let start = moment(form.startDate, "D.M.YYYY").hours(form.startTimeHours).minutes(form.startTimeMinutes);

    let end = moment(form.startDate, "D.M.YYYY");
    if(form.endTimeHours === 24 && form.endTimeMinutes === 0) {
      end.add(1, "days").hours(0).minutes(0);
    }
    else {
      end.hours(form.endTimeHours).minutes(form.endTimeMinutes);
    }

    let body = {
      assistantId: form.assistant === "Unassigned" ? null : form.assistant,
      start: start.format("YYYY-MM-DDTHH:mm:ss"),
      end: end.format("YYYY-MM-DDTHH:mm:ss"),
      sick: form.sick
    };

    let url = API.origin+API.workShifts;
    let method = 'post';
    if(form.target) {
      url += "/"+form.target;
      method = 'put';
    }
    return axios({
      url,
      method,
      headers: {'Authorization': getState().login.token},
      data: body,
      withCredentials: true
    })
      .then((response) => {
        dispatch(submitWorkShiftSuccess(response.data));
        dispatch(endWorkShiftEdit());
        toastr.success('Saved');
      })
      .catch(e => {
        let error = formErrorFromApiError(e);
        dispatch(submitWorkShiftError(error));
        toastr.error("Error", error._error);
        throw new SubmissionError(error);
      });
  };
}
