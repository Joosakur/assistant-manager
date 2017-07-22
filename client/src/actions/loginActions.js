import * as types from "../constants/actionTypes";

export function postRegistrationBegin() {
  return {type: types.POST_REGISTRATION_BEGIN};
}

export function postRegistrationSuccess() {
  return {type: types.POST_REGISTRATION_SUCCESS};
}

export function postRegistrationError(error) {
  return {type: types.POST_REGISTRATION_ERROR, error};
}
