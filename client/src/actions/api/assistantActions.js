import { createAction } from 'redux-actions'

const createAssistant = createAction('API__ASSISTANTS__CREATE', payload => payload, (payload, meta) => meta)
const createAssistantSuccess = createAction('API__ASSISTANTS__CREATE_SUCCESS')
const createAssistantFail = createAction('API__ASSISTANTS__CREATE_FAIL')

const listAssistants = createAction('API__ASSISTANTS__LIST')
const listAssistantsSuccess = createAction('API__ASSISTANTS__LIST_SUCCESS')
const listAssistantsFail = createAction('API__ASSISTANTS__LIST_FAIL')

const listCoworkers = createAction('API__ASSISTANTS__LIST_COWORKERS')

const updateAssistant = createAction('API__ASSISTANTS__UPDATE', payload => payload, (payload, meta) => meta)
const updateAssistantSuccess = createAction('API__ASSISTANTS__UPDATE_SUCCESS')
const updateAssistantFail = createAction('API__ASSISTANTS__UPDATE_FAIL')

export {
  createAssistant, createAssistantSuccess, createAssistantFail,
  listAssistants, listAssistantsSuccess, listAssistantsFail,
  listCoworkers,
  updateAssistant, updateAssistantSuccess, updateAssistantFail
}
