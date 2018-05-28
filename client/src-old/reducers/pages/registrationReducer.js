/*
import * as types from "../constants/actionTypes";
import initialState from "../initialState";

export default function registrationReducer(state = initialState.registration, action) {
  switch (action.type) {
    case types.POST_REGISTRATION_BEGIN:
      return Object.assign({}, state, {loading: true});
    case types.POST_REGISTRATION_SUCCESS:
      return Object.assign({}, initialState.registration);
    case types.POST_REGISTRATION_ERROR:
      return Object.assign({}, state, {loading: false});
    default:
      return state;
  }
}
*/
