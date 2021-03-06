import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as toastr } from 'react-redux-toastr'
import { reducer as form } from 'redux-form'

import initialState from './initialState'
import {logout} from '../actions/authActions'
import entities from './entities'
import auth from './auth'
import pages from './pages'

const combinedReducer = combineReducers({
  entities,
  auth,
  pages,

  // 3rd party
  router,
  toastr,
  form // note: redux-form expects that the reducer name is exactly 'form'
})

const rootReducer = (state, action) => {
  if(action.type === logout.toString()) {
    return {
      ...initialState,
      router: state.router
    }
  }

  return combinedReducer(state, action)
}

export default rootReducer
