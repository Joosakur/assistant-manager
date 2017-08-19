import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function verificationReducer(state = initialState.verification, action) {
  switch (action.type) {
    case types.POST_VERIFICATION_BEGIN:
      return Object.assign({}, state, {loading: true, error: undefined});
    case types.POST_VERIFICATION_SUCCESS:
      return Object.assign({}, state, {loading: false, error: undefined});
    case types.POST_VERIFICATION_ERROR:
      return Object.assign({}, state, {loading: false, error: action.error});
    default:
      return state;
  }
}
