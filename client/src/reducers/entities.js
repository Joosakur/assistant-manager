import {handleActions} from "redux-actions"
import {createAssistantSuccess, listAssistantsSuccess, updateAssistantSuccess} from "../actions/api/assistantActions"
import {
  createWorkShiftSuccess, deleteWorkShiftSuccess, listWorkShiftsSuccess,
  updateWorkShiftSuccess
} from "../actions/api/workShiftActions"

const reduceCreateAssistantSuccess = (state, {payload: assistant}) => ({
  ...state,
  assistants: {
    ...state.assistants,
    [assistant.id]: assistant
  },
  workShiftsByAssistant: {
    ...state.workShiftsByAssistant,
    [assistant.id]: []
  }
})

const reduceListAssistantsSuccess = (state, {payload: assistantsArray}) => {
  const assistants =  assistantsArray.reduce((map, assistant) => {
    map[assistant.id] = assistant
    return map
  }, {})

  const workShiftsByAssistant = assistantsArray.reduce((index, assistant) => {
    index[assistant.id] = state.workShiftsByAssistant[assistant.id] || []
    return index
  }, {})

  return { ...state, assistants, workShiftsByAssistant }
}

const reduceUpdateAssistantSuccess = (state, {payload: assistant}) => ({
  ...state,
  assistants: {
    ...state.assistants,
    [assistant.id]: assistant
  }
})

const reduceCreateWorkShiftSuccess = (state, {payload: workShift}) => ({
  ...state,
  workShifts: {
    ...state.workShifts,
    [workShift.id]: workShift
  },
  workShiftsByAssistant: {
    ...state.workShiftsByAssistant,
    [workShift.assistantId]: state.workShiftsByAssistant[workShift.assistantId]
      ? [...state.workShiftsByAssistant[workShift.assistantId], workShift.id]
      : [workShift.id]
  }
})

const reduceListWorkShiftsSuccess = (state, {payload: workShiftsArray}) => {
  const workShifts = workShiftsArray.reduce((map, workShift) => {
    map[workShift.id] = workShift
    return map
  }, {})

  // first empty current index entries but keep the keys
  const workShiftsByAssistant = Object.keys(state.workShiftsByAssistant).reduce((index, assistantId) => {
    index[assistantId] = []
    return index
  }, {})

  // then add the work shifts to the index
  workShiftsArray.filter(workShift => workShift.assistantId).forEach(workShift => {
    if (!workShiftsByAssistant[workShift.assistantId])
      workShiftsByAssistant[workShift.assistantId] = []

    workShiftsByAssistant[workShift.assistantId].push(workShift.id)
  })

  return { ...state, workShifts, workShiftsByAssistant }
}

const reduceUpdateWorkShiftSuccess = (state, {payload: workShift}) => {
  const workShifts = {
    ...state.workShifts,
    [workShift.id]: workShift
  }

  const workShiftsByAssistant = { ...state.workShiftsByAssistant }

  const oldVersion = state.workShifts[workShift.id]
  const oldAssistantId = oldVersion.assistantId
  if ( workShift.assistantId !== oldAssistantId ) {
    if (oldAssistantId) {
      // remove from old index
      workShiftsByAssistant[oldAssistantId] = [...workShiftsByAssistant[oldAssistantId]].filter(id => id !== workShift.id)
    }
    if (workShift.assistantId) {
      // add the new index
      workShiftsByAssistant[workShift.assistantId] = [...(workShiftsByAssistant[workShift.assistantId] || []), workShift.id]
    }
  }

  return { ...state, workShifts, workShiftsByAssistant }
}

const reduceDeleteWorkShiftSuccess = (state, {payload: workShiftId}) => {
  const workShifts = { ...state.workShifts }
  delete workShifts[workShiftId]

  const assistantId = state.workShifts[workShiftId].assistantId
  const workShiftsByAssistant = { ...state.workShiftsByAssistant }
  if (assistantId) {
    workShiftsByAssistant[assistantId] = workShiftsByAssistant[assistantId].filter(id => id !== workShiftId)
  }

  return { ...state, workShifts, workShiftsByAssistant }
}

const entitiesReducer = handleActions({
  // == assistants ==
  [createAssistantSuccess]: reduceCreateAssistantSuccess,
  [listAssistantsSuccess]: reduceListAssistantsSuccess,
  [updateAssistantSuccess]: reduceUpdateAssistantSuccess,

  // == work shifts ==
  [createWorkShiftSuccess]: reduceCreateWorkShiftSuccess,
  [listWorkShiftsSuccess]: reduceListWorkShiftsSuccess,
  [updateWorkShiftSuccess]: reduceUpdateWorkShiftSuccess,
  [deleteWorkShiftSuccess]: reduceDeleteWorkShiftSuccess
//
}, {
  assistants: {}
})

export default entitiesReducer
