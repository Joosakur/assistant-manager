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

export function postVerificationBegin() {
  return {type: types.POST_VERIFICATION_BEGIN};
}

export function postVerificationSuccess() {
  return {type: types.POST_VERIFICATION_SUCCESS};
}

export function postVerificationError(error) {
  return {type: types.POST_VERIFICATION_ERROR, error};
}

