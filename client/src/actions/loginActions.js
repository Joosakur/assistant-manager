import * as types from "../constants/actionTypes";

export function loadAuthBegin() {
  return {type: types.LOAD_AUTH_BEGIN};
}

export function postLoginBegin() {
  return {type: types.POST_LOGIN_BEGIN};
}

export function postLoginSuccess(token, userData) {
  return {type: types.POST_LOGIN_SUCCESS, token, userData};
}

export function postLoginError(error) {
  return {type: types.POST_LOGIN_ERROR, error};
}

export function resetState() {
  return {type: types.RESET_STATE};
}
