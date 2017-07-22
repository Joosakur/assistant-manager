import {API, SELF} from '../constants/urls';
import {push} from 'react-router-redux';
import {toastr} from 'react-redux-toastr';
import axios from 'axios';
import {getAssistantsBegin, getAssistantsError, getAssistantsSuccess} from "../actions/assistantActions";
import {generalErrorFromApiError} from "../utils/errorUtils";

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
