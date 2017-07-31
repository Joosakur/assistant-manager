import * as types from "../constants/actionTypes";

export function postLoginBegin() {
  return {type: types.POST_LOGIN_BEGIN};
}

export function postLoginSuccess(token, firstName, lastName) {
  return {type: types.POST_LOGIN_SUCCESS, token, firstName, lastName};
}

export function postLoginError(error) {
  return {type: types.POST_LOGIN_ERROR, error};
}

export function resetState() {
  return {type: types.RESET_STATE};
}
