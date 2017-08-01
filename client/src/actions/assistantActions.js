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


export function startAssistantEdit(target) {
  return {type: types.EDIT_ASSISTANT_START, target};
}

export function endAssistantEdit() {
  return {type: types.EDIT_ASSISTANT_END};
}

export function submitAssistantBegin() {
  return {type: types.SUBMIT_ASSISTANT_BEGIN};
}

export function submitAssistantSuccess(assistant) {
  return {type: types.SUBMIT_ASSISTANT_SUCCESS, assistant};
}

export function submitAssistantError() {
  return {type: types.SUBMIT_ASSISTANT_ERROR};
}
