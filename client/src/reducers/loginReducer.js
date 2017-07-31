import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function loginReducer(state = initialState.login, action) {
  switch (action.type) {
    case types.POST_LOGIN_BEGIN:
      return Object.assign({}, state, {loading: true});
    case types.POST_LOGIN_SUCCESS:
      return Object.assign({}, {loading: false, authenticated: true, token: action.token});
    case types.POST_LOGIN_ERROR:
      return Object.assign({}, state, {loading: false, authenticated: false, token: '', firstName: '', lastName: ''});
    default:
      return state;
  }
}
