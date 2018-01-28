/*
import * as types from "../constants/actionTypes";
import initialState from "../initialState";

export default function assistantReducer(state = initialState.assistants, action) {
  switch (action.type) {
    case types.EDIT_ASSISTANT_START:
      return Object.assign({}, state, {target: action.target || null, editing: true});
    case types.EDIT_ASSISTANT_END:
      return Object.assign({}, state, {editing: false});
    case types.SUBMIT_ASSISTANT_BEGIN:
      return Object.assign({}, state, {submitting: true});
    case types.SUBMIT_ASSISTANT_SUCCESS:
      return Object.assign({}, state, {submitting: false});
    case types.SUBMIT_ASSISTANT_ERROR:
      return Object.assign({}, state, {submitting: false});
    default:
      return state;
  }
}
*/
