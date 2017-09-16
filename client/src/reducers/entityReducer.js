import * as types from "../constants/actionTypes";
import initialState from "./initialState";
import moment from "moment";

const addToWorkShiftDateIndex = (index, workShift) => {
  let date = moment(workShift.start).format("DD.MM.YYYY");
  if(!index [date])
    index [date] = [];
  index [date].push(workShift.id);
};

const removeFromWorkShiftDateIndex = (index, workShift) => {
  let date = moment(workShift.start).format("DD.MM.YYYY");
  let indexElem = index [date];
  if(indexElem) {
    let deletedIndex = indexElem.indexOf(workShift.id);
    if(deletedIndex > -1)
      indexElem.splice(deletedIndex, 1);
  }
};

const cloneWorkShiftsDateIndex = (workShiftsByStartDate) => {
  let clone = {};
  Object.getOwnPropertyNames(workShiftsByStartDate).forEach((date) => {
    clone [date] = Array.of(...(workShiftsByStartDate [date]));
  });
  return clone;
};

const populateAssistants = (state, assistants) => {
  let assistantsObj = {};
  for (let assistant of assistants) {
    assistantsObj[assistant.id] = assistant;
  }
  return Object.assign({}, state, {assistants: assistantsObj});
};

const populateWorkShifts = (state, workShifts) => {
  let workShiftsObj = {};
  let workShiftsByStartDate = {};
  for (let workShift of workShifts) {
    workShiftsObj[workShift.id] = workShift;
    addToWorkShiftDateIndex(workShiftsByStartDate, workShift);
  }
  return Object.assign({}, state, {workShifts: workShiftsObj, workShiftsByStartDate});
};

const submitWorkShiftSuccess = (state, workShift) => {
  let newWorkShifts = Object.assign({}, state.workShifts);
  newWorkShifts[workShift.id] = workShift;
  let newWorkShiftsByDate = cloneWorkShiftsDateIndex(state.workShiftsByStartDate);
  addToWorkShiftDateIndex(newWorkShiftsByDate, workShift);

  return Object.assign({}, state, {workShifts: newWorkShifts, workShiftsByStartDate: newWorkShiftsByDate});
};

const submitAssistantSuccess = (state, assistant) => {
  let newAssistants = Object.assign({}, state.assistants);
  newAssistants[assistant.id] = assistant;
  return Object.assign({}, state, {assistants: newAssistants});
};

const deleteWorkShiftSuccess = (state, id) => {
  let deleted = state.workShifts [id];
  let newWorkShiftsByDate = cloneWorkShiftsDateIndex(state.workShiftsByStartDate);
  removeFromWorkShiftDateIndex(newWorkShiftsByDate, deleted);

  let newWorkShifts = Object.assign({}, state.workShifts);
  newWorkShifts[id] = undefined;

  return Object.assign({}, state, {workShifts: newWorkShifts, workShiftsByStartDate: newWorkShiftsByDate});
};



export default function entityReducer(state = initialState.entities, action) {
  switch (action.type) {
    case types.GET_ASSISTANTS_SUCCESS:
      return populateAssistants(state, action.assistants);
    case types.GET_WORK_SHIFTS_SUCCESS:
      return populateWorkShifts(state, action.workShifts);
    case types.SUBMIT_WORK_SHIFT_SUCCESS:
      return submitWorkShiftSuccess(state, action.workShift);
    case types.DELETE_WORK_SHIFT_SUCCESS:
      return deleteWorkShiftSuccess(state, action.id);
    case types.SUBMIT_ASSISTANT_SUCCESS:
      return submitAssistantSuccess(state, action.assistant);
    default:
      return state;
  }
}
