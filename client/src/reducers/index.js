import {routerReducer} from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import assistantReducer from './assistantReducer';
import registrationReducer from './registrationReducer';
import loginReducer from "./loginReducer";
import {RESET_STATE} from "../constants/actionTypes";
import entityReducer from "./entityReducer";
import scheduleReducer from "./scheduleReducer";
import verificationReducer from "./verificationReducer";
import reportingReducer from "./reportingReducer";

const rootReducer = (state = {}, action) => {
  if(action.type === RESET_STATE)
    state = Object.assign({}, {routing: state.routing});

  return {
    entities: entityReducer(state.entities, action),
    assistants: assistantReducer(state.assistants, action),
    schedule: scheduleReducer(state.schedule, action),
    registration: registrationReducer(state.registration, action),
    verification: verificationReducer(state.verification, action),
    login: loginReducer(state.login, action),
    reporting: reportingReducer(state.reporting, action),
    routing: routerReducer(state.routing, action),
    toastr: toastrReducer(state.toastr, action),
    form: formReducer(state.form, action)
  };
};

export default rootReducer;
