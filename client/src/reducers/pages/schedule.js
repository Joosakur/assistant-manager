import {handleActions} from 'redux-actions'
import {
  listWorkShifts, listWorkShiftsSuccess, listWorkShiftsFail,
  createWorkShiftSuccess,
  updateWorkShiftSuccess
} from '../../actions/api/workShiftActions'
import {openWorkShiftModal, closeWorkShiftModal, copyDay} from '../../actions/ui/workShiftActions'
import initialState from '../initialState'

const startLoading = state => ({...state, loading: true})
const stopLoading = state => ({...state, loading: false})

const setModalOpen = (state, {payload: workShiftId}) => ({
  ...state,
  workShiftDialog: {
    ...state.workShiftDialog,
    open: true,
    workShiftId: workShiftId || null
  }
})

const setModalClosed = state => ({
  ...state,
  workShiftDialog: {
    ...state.workShiftDialog,
    open: false,
    workShiftId: null
  }
})

const setCopiedDay = (state, {payload: copiedDay}) => ({
  ...state,
  copiedDay
})

const schedulePageReducer = handleActions({
  [listWorkShifts]: startLoading,
  [listWorkShiftsSuccess]: stopLoading,
  [listWorkShiftsFail]: stopLoading,

  [openWorkShiftModal]: setModalOpen,
  [closeWorkShiftModal]: setModalClosed,
  [createWorkShiftSuccess]: setModalClosed,
  [updateWorkShiftSuccess]: setModalClosed,
  [copyDay]: setCopiedDay
}, initialState.pages.schedule)

export default schedulePageReducer
