import {API, SELF} from '../constants/urls';
import {push} from 'react-router-redux';
import {formErrorFromApiError} from '../utils/errorUtils';
import {SubmissionError} from 'redux-form';
import axios from 'axios';
import {amplify} from 'amplifyjs/individual/amplify.store';
import {postLoginBegin, postLoginError, postLoginSuccess, resetState} from "../actions/loginActions";

export function postLogin(username, password) {
  return function (dispatch) {
    dispatch(postLoginBegin());

    let body = {username, password};

    return axios.post(API.origin+API.login, body, {withCredentials: true})
      .then((response) => {
        let responseData = response.data;
        dispatch(postLoginSuccess(responseData.token));
        amplify.store('token', responseData.token);
        dispatch(push(SELF.assistants));
      })
      .catch(e => {
        let error = formErrorFromApiError(e);
        dispatch(postLoginError(error));
        throw new SubmissionError(error);
      });
  };
}

export function loadAuth() {
  return function (dispatch) {
    let token = amplify.store('token');
    if(!token)
      return;
    axios.get(API.origin+API.employers+"/self", {headers: {'Authorization': token}})
      .then(() => {
        dispatch(postLoginSuccess(token));
      })
      .catch(() => {
        amplify.store('token', null);
        dispatch(postLoginError());
      });
  };
}


export function logout() {
  return function (dispatch) {
    amplify.store('token', null);
    dispatch(resetState());
  };
}

