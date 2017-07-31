import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function assistantReducer(state = initialState.assistants, action) {
  switch (action.type) {
    case types.CREATE_ASSISTANT:
      return [...state,
        Object.assign({}, action.assistant)
      ];
    default:
      return state;
  }
}
