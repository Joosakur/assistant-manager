import { createAction } from 'redux-actions'

const openWorkShiftModal = createAction('UI__WORK_SHIFTS__OPEN_MODAL')
const closeWorkShiftModal = createAction('UI__WORK_SHIFTS__CLOSE_MODAL')

export {
  openWorkShiftModal, closeWorkShiftModal
}
