import * as types from "../constants/actionTypes";

export function postVerificationBegin() {
  return {type: types.POST_VERIFICATION_BEGIN};
}

export function postVerificationSuccess() {
  return {type: types.POST_VERIFICATION_SUCCESS};
}

export function postVerificationError(error) {
  return {type: types.POST_VERIFICATION_ERROR, error};
}

