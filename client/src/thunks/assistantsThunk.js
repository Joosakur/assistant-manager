import {API, SELF} from '../constants/urls';
import {push} from 'react-router-redux';
import {toastr} from 'react-redux-toastr';
import axios from 'axios';
import {
  endAssistantEdit,
  getAssistantsBegin, getAssistantsError, getAssistantsSuccess,
  submitAssistantBegin, submitAssistantError, submitAssistantSuccess
} from "../actions/assistantActions";
import {formErrorFromApiError, generalErrorFromApiError} from "../utils/errorUtils";
import moment from "moment";
import SubmissionError from "redux-form/es/SubmissionError";

export function getAssistants() {
  return function (dispatch, getState) {
    dispatch(getAssistantsBegin());

    if(!getState().login.authenticated) {
      dispatch(push(SELF.login));
      toastr.error("Error", "Please login");
    }

    return axios.get(API.origin+API.assistants, {headers: {'Authorization': getState().login.token}})
      .then((response) => {
        dispatch(getAssistantsSuccess(response.data));
      })
      .catch(e => {
        let error = generalErrorFromApiError(e);
        dispatch(getAssistantsError());
        toastr.error("Error", error);
      });
  };
}


export function sendAssistantEdit(form) {
  return function (dispatch, getState) {
    dispatch(submitAssistantBegin());

    let body = {
      firstName: form.firstName
    };

    let url = API.origin+API.assistants;
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
        dispatch(submitAssistantSuccess(response.data));
        dispatch(endAssistantEdit());
        toastr.success('Saved');
      })
      .catch(e => {
        let error = formErrorFromApiError(e);
        dispatch(submitAssistantError(error));
        toastr.error("Error", error._error);
        throw new SubmissionError(error);
      });
  };
}
