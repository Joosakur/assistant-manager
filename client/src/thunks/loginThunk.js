import {API, SELF} from '../constants/urls';
import {push} from 'react-router-redux';
import {formErrorFromApiError} from '../utils/errorUtils';
import {SubmissionError} from 'redux-form';
import axios from 'axios';
import {amplify} from 'amplifyjs/individual/amplify.store';
import {loadAuthBegin, postLoginBegin, postLoginError, postLoginSuccess, resetState} from "../actions/loginActions";

export function postLogin(username, password) {
  return function (dispatch) {
    dispatch(postLoginBegin());

    let body = {username, password};
    console.debug("submitting login");

    return axios.post(API.origin+API.login, body, {withCredentials: true})
      .then((response) => {
        let token = response.data.token;
        console.debug("token received");

        let d = dispatch(loadUserData(token));
        console.debug(d);
        d.then(() => {
            console.debug("saving token");
            amplify.store('token', token);
            dispatch(push(SELF.assistants));
          });
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
    dispatch(loadAuthBegin());
    console.debug("loading auth");
    let token = amplify.store('token');
    if(!token)
      dispatch(postLoginError());
    console.debug("token found");
    dispatch(loadUserData(token));
  };
}

function loadUserData(token) {
  return function (dispatch) {
    console.debug("loading userdata");
    return axios.get(API.origin+API.employers+"/self", {headers: {'Authorization': token}})
      .then((response) => {
        let userData = response.data;
        console.log("userdata received");
        dispatch(postLoginSuccess(token, userData));
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
    dispatch(push(SELF.login));
  };
}

