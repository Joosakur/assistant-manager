import * as types from "../actions/actionTypes";

export default function assistantReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_ASSISTANT:
      return [...state,
        Object.assign({}, action.assistant)
      ];
    default:
      return state;
  }
}
