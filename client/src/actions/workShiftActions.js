import * as types from "../constants/actionTypes";

export function createAssistant(assistant) {
  return {type: types.CREATE_ASSISTANT, assistant};
}

export function getAssistantsBegin() {
  return {type: types.GET_ASSISTANTS_BEGIN};
}

export function getAssistantsSuccess(assistants) {
  return {type: types.GET_ASSISTANTS_SUCCESS, assistants};
}

export function getAssistantsError() {
  return {type: types.GET_ASSISTANTS_ERROR};
}

