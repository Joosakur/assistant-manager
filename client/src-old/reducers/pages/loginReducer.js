/*
import * as types from "../constants/actionTypes";
import initialState from "../initialState";

export default function loginReducer(state = initialState.login, action) {
  switch (action.type) {
    case types.LOAD_AUTH_BEGIN:
      return Object.assign({}, state, {authenticating: true});
    case types.POST_LOGIN_BEGIN:
      return Object.assign({}, state, {loading: true, authenticating:true});
    case types.POST_LOGIN_SUCCESS:
      console.debug("login finished");
      return Object.assign({}, {loading: false, authenticated: true, authenticating: false, token: action.token, userData: action.userData});
    case types.POST_LOGIN_ERROR:
      return initialState.login;
    default:
      return state;
  }
}
*/
