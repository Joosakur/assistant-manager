import { createAction } from 'redux-actions'

const createAssistant = createAction('API__ASSISTANTS__CREATE')
const createAssistantSuccess = createAction('API__ASSISTANTS__CREATE_SUCCESS')
const createAssistantFail = createAction('API__ASSISTANTS__CREATE_FAIL')

const listAssistants = createAction('API__ASSISTANTS__LIST')
const listAssistantsSuccess = createAction('API__ASSISTANTS__LIST_SUCCESS')
const listAssistantsFail = createAction('API__ASSISTANTS__LIST_FAIL')

const updateAssistant = createAction('API__ASSISTANTS__UPDATE')
const updateAssistantSuccess = createAction('API__ASSISTANTS__UPDATE_SUCCESS')
const updateAssistantFail = createAction('API__ASSISTANTS__UPDATE_FAIL')

export {
  createAssistant, createAssistantSuccess, createAssistantFail,
  listAssistants, listAssistantsSuccess, listAssistantsFail,
  updateAssistant, updateAssistantSuccess, updateAssistantFail
}
