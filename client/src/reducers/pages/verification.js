import {handleActions} from 'redux-actions'

import {
  verifyRegistration, verifyRegistrationSuccess, verifyRegistrationFail
} from '../../actions/api/employerActions'
import initialState from '../initialState'

const verificationPageReducer = handleActions({
  [verifyRegistration]: state => ({
    ...state,
    loading: true,
    error: null
  }),
  [verifyRegistrationSuccess]: state => ({
    ...state,
    loading: false,
    error: null
  }),
  [verifyRegistrationFail]: (state, {payload: error}) => ({
    ...state,
    loading: false,
    error
  })
}, initialState.pages.verification)

export default verificationPageReducer
