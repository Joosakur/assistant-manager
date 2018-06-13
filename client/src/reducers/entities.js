import {handleActions} from 'redux-actions'
import moment from 'moment'

import {createAssistantSuccess, listAssistantsSuccess, updateAssistantSuccess} from '../actions/api/assistantActions'
import {
  createWorkShiftSuccess, deleteWorkShiftSuccess, listWorkShiftsSuccess,
  updateWorkShiftSuccess
} from '../actions/api/workShiftActions'
import {getSelfSuccess, updateEmployerSuccess} from '../actions/api/employerActions'
import initialState from './initialState'

const reduceGetSelfSuccess = (state, {payload: employer}) => {
  return {
    ...state,
    employer: {
      ...employer
    }
  }
}

const reduceUpdateEmployerSuccess = (state, {payload: employer}) => {
  return {
    ...state,
    employer: {
      ...employer
    }
  }
}

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

const reduceCreateWorkShiftSuccess = (state, {payload: workShift}) => {
  const startDate = moment(workShift.start).format('YYYY-MM-DD')
  const { id, assistantId } = workShift
  return {
    ...state,
    workShifts: {
      ...state.workShifts,
      [id]: workShift
    },
    workShiftsByAssistant: {
      ...state.workShiftsByAssistant,
      [assistantId]: state.workShiftsByAssistant[assistantId]
        ? [...state.workShiftsByAssistant[assistantId], id]
        : [id]
    },
    workShiftsByStartDate: {
      ...state.workShiftsByStartDate,
      [startDate]: state.workShiftsByStartDate[startDate]
        ? [...state.workShiftsByStartDate[startDate], id]
        : [id]

    }
  }
}

const getWorkShiftsByAssistant = workShiftsArray => {
  return workShiftsArray
    .filter(({assistantId}) => assistantId)
    .reduce((index, {id, assistantId}) => {
      const old = index[assistantId] || []
      index[assistantId] = [...old, id]
      return index
    }, {})
}

const getWorkShiftsByStartDate = workShiftsArray => {
  return workShiftsArray.reduce((ind, workspace) => {
    const {id, start} = workspace
    const key = moment(start).format('YYYY-MM-DD')
    if (ind[key]) {
      ind[key].push(id)
    } else {
      ind[key] = [id]
    }
    return ind
  }, {})
}

const reduceListWorkShiftsSuccess = (state, {payload: workShiftsArray}) => {
  const workShifts = workShiftsArray.reduce((map, workShift) => {
    map[workShift.id] = workShift
    return map
  }, {})

  const workShiftsByAssistant = getWorkShiftsByAssistant(workShiftsArray)
  const workShiftsByStartDate = getWorkShiftsByStartDate(workShiftsArray)

  return { ...state, workShifts, workShiftsByAssistant, workShiftsByStartDate }
}

const updateWorkShiftsByAssistant = (workShift, oldState) => {
  const workShiftsByAssistant = { ...oldState.workShiftsByAssistant }

  const oldAssistantId = oldState.workShifts[workShift.id].assistantId
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

  return workShiftsByAssistant
}

const updateWorkShiftsByStartDate = (workShift, oldState) => {
  const { id, start } = workShift
  const date = moment(start).format('YYYY-MM-DD')
  const workShiftsByStartDate = { ...oldState.workShiftsByStartDate }
  const oldDate = moment(oldState.workShifts[id].start).format('YYYY-MM-DD')

  if( date !== oldDate) {
    workShiftsByStartDate[oldDate] = [...workShiftsByStartDate[oldDate]].filter(i => i !== id)
    workShiftsByStartDate[date] = [...(workShiftsByStartDate[date] || []), id]
  }

  return workShiftsByStartDate
}

const reduceUpdateWorkShiftSuccess = (state, {payload: workShift}) => {
  const workShifts = {
    ...state.workShifts,
    [workShift.id]: workShift
  }

  const workShiftsByAssistant = updateWorkShiftsByAssistant(workShift, state)
  const workShiftsByStartDate = updateWorkShiftsByStartDate(workShift, state)

  return { ...state, workShifts, workShiftsByAssistant, workShiftsByStartDate }
}

const reduceDeleteWorkShiftSuccess = (state, {payload: workShiftId}) => {
  const workShifts = { ...state.workShifts }
  const { assistantId, start } = state.workShifts[workShiftId]
  delete workShifts[workShiftId]

  const workShiftsByAssistant = { ...state.workShiftsByAssistant }
  if (assistantId) {
    workShiftsByAssistant[assistantId] = (workShiftsByAssistant[assistantId] || []).filter(id => id !== workShiftId)
  }

  const date = moment(start).format('YYYY-MM-DD')
  const workShiftsByStartDate = { ...state.workShiftsByStartDate }
  workShiftsByStartDate[date] = (workShiftsByStartDate[date] || []).filter(id => id !== workShiftId)

  return { ...state, workShifts, workShiftsByAssistant, workShiftsByStartDate }
}

const entitiesReducer = handleActions({
  // == employer / user ==
  [getSelfSuccess]: reduceGetSelfSuccess,
  [updateEmployerSuccess]: reduceUpdateEmployerSuccess,

  // == assistants ==
  [createAssistantSuccess]: reduceCreateAssistantSuccess,
  [listAssistantsSuccess]: reduceListAssistantsSuccess,
  [updateAssistantSuccess]: reduceUpdateAssistantSuccess,

  // == work shifts ==
  [createWorkShiftSuccess]: reduceCreateWorkShiftSuccess,
  [listWorkShiftsSuccess]: reduceListWorkShiftsSuccess,
  [updateWorkShiftSuccess]: reduceUpdateWorkShiftSuccess,
  [deleteWorkShiftSuccess]: reduceDeleteWorkShiftSuccess
}, initialState.entities)

export default entitiesReducer
