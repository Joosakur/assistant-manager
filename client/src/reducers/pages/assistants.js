import {handleActions} from 'redux-actions'
import {
  listAssistants, listAssistantsSuccess, listAssistantsFail,
  createAssistantSuccess,
  updateAssistantSuccess
} from '../../actions/api/assistantActions'
import {openAssistantModal, closeAssistantModal} from '../../actions/ui/assistantActions'
import initialState from '../initialState'

const startLoading = state => ({...state, loading: true})
const stopLoading = state => ({...state, loading: false})

const setModalOpen = (state, {payload: assistantId}) => ({
  ...state,
  assistantDialog: {
    ...state.assistantDialog,
    open: true,
    assistantId: assistantId || null
  }
})

const setModalClosed = state => ({
  ...state,
  assistantDialog: {
    ...state.assistantDialog,
    open: false,
    assistantId: null
  }
})

const assistantsPageReducer = handleActions({
  [listAssistants]: startLoading,
  [listAssistantsSuccess]: stopLoading,
  [listAssistantsFail]: stopLoading,

  [openAssistantModal]: setModalOpen,
  [closeAssistantModal]: setModalClosed,
  [createAssistantSuccess]: setModalClosed,
  [updateAssistantSuccess]: setModalClosed,
}, initialState.pages.assistants)

export default assistantsPageReducer
