import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import {reducer as toastr } from 'react-redux-toastr'
import { reducer as forms } from 'redux-form'
import { localeReducer as locale } from 'react-localize-redux'

import entities from "./entities"
// import assistants from './pages/assistantReducer'
// import registration from './pages/registrationReducer'
// import login from "./pages/loginReducer"
// import schedule from "./pages/scheduleReducer"
// import verification from "./pages/verificationReducer"
// import reports from "./pages/reportingReducer"

const mockReducer = state => state || {}

export default combineReducers({
  entities,

  // page reducers
  registration: mockReducer,
  verification: mockReducer,
  login: mockReducer,
  assistants: mockReducer,
  schedule: mockReducer,
  reports: mockReducer,

  // 3rd party
   router,
   toastr,
   forms,
   locale
})
