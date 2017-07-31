import * as types from "../constants/actionTypes";
import initialState from "./initialState";

const populateAssistants = (state, assistants) => {
  let assistantsObj = {};
  for (let assistant of assistants) {
    assistantsObj[assistant.id] = assistant;
  }
  return Object.assign({}, state, {assistants: assistantsObj});
};

const populateWorkShifts = (state, workShifts) => {
  let workShiftsObj = {};
  for (let workShift of workShifts) {
    workShiftsObj[workShift.id] = workShift;
  }
  return Object.assign({}, state, {workShifts: workShiftsObj});
};

const workShiftSuccess = (state, workShift) => {
  let newWorkShifts = Object.assign({}, state.workShifts);
  newWorkShifts[workShift.id] = workShift;
  return Object.assign({}, state, {workShifts: newWorkShifts});
};

export default function entityReducer(state = initialState.entities, action) {
  switch (action.type) {
    case types.GET_ASSISTANTS_SUCCESS:
      return populateAssistants(state, action.assistants);
    case types.GET_WORK_SHIFTS_SUCCESS:
      return populateWorkShifts(state, action.workShifts);
    case types.SUBMIT_WORK_SHIFT_SUCCESS:
      return workShiftSuccess(state, action.workShift);
    default:
      return state;
  }
}
