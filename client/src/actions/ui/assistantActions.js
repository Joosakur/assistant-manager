import { createAction } from 'redux-actions'

const openAssistantModal = createAction('UI__ASSISTANTS__OPEN_MODAL')
const closeAssistantModal = createAction('UI__ASSISTANTS__CLOSE_MODAL')

export {
  openAssistantModal, closeAssistantModal
}
