import { combineReducers } from 'redux'

import assistantsPageReducer from './pages/assistants'
import schedulePageReducer from './pages/schedule'
import verificationPageReducer from './pages/verification'
import reportingPageReducer from './pages/reporting'

export default combineReducers({
  verification: verificationPageReducer,
  assistants: assistantsPageReducer,
  schedule: schedulePageReducer,
  reporting: reportingPageReducer
})
