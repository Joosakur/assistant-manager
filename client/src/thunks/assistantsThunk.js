import {API, SELF} from '../constants/urls';
import {push} from 'react-router-redux';
import {toastr} from 'react-redux-toastr';
import axios from 'axios';
import {
  endAssistantEdit,
  getAssistantsBegin, getAssistantsError, listAssistantsSuccess,
  submitAssistantBegin, submitAssistantError, submitAssistantSuccess
} from "../actions/api/assistantActions";
import {formErrorFromApiError, generalErrorFromApiError} from "../utils/errorUtils";
import SubmissionError from "redux-form/es/SubmissionError";
import moment from "moment";

export function getAssistants() {
  return function (dispatch, getState) {
    dispatch(getAssistantsBegin());

    if(!getState().login.authenticated) {
      dispatch(push(SELF.login));
      toastr.error("Error", "Please login");
    }

    return axios.get(API.origin+API.assistants, {headers: {'Authorization': getState().login.token}})
      .then((response) => {
        dispatch(listAssistantsSuccess(response.data));
      })
      .catch(e => {
        let error = generalErrorFromApiError(e);
        dispatch(getAssistantsError());
        toastr.error("Error", error);
      });
  };
}

export function getCoworkers(assistantId) {
  return function (dispatch, getState) {
    dispatch(getAssistantsBegin());

    return axios.get(API.origin+API.assistants+"/"+assistantId+"/coworkers", {
      headers: {'Authorization': getState().login.token}
    })
      .then((response) => {
        dispatch(listAssistantsSuccess(response.data));
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
      firstName: form.firstName,
      lastName: form.lastName,
      birthday: moment(form.birthday, "D.M.YYYY").format("YYYY-MM-DD"),
      active: true,
      backgroundColor: form.backgroundColor,
      textColor: form.whiteText ? "#ffffff" : "#000000"
    };
    if(form.nickName && form.nickName.length>0) {
      body.nickName = form.nickName;
    }

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
