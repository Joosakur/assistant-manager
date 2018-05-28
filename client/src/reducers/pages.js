import { combineReducers } from 'redux'

import assistantsPageReducer from './pages/assistants'
import schedulePageReducer from './pages/schedule'

const mockReducer = state => state || {}

export default combineReducers({
  registration: mockReducer,
  verification: mockReducer,
  assistants: assistantsPageReducer,
  schedule: schedulePageReducer,
  reports: mockReducer,
})
