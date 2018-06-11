import {handleActions} from 'redux-actions'

import {
  requestReport,
  getReport, getReportSuccess, getReportFail
} from '../../actions/api/reportActions'
import {
  resetReportForm
} from '../../actions/ui/reportActions'

import initialState from '../initialState'

const reportingPageReducer = handleActions({
  [requestReport]: state => ({
    ...state,
    polling: false,
    downloadLink: null
  }),
  [getReport]: state => ({
    ...state,
    polling: true,
    downloadLink: null
  }),
  [getReportSuccess]: (state, {payload: downloadLink}) => ({
    ...state,
    polling: false,
    downloadLink
  }),
  [getReportFail]: state => ({
    ...state,
    polling: false,
    downloadLink: null
  }),
  [resetReportForm]: state => ({
    ...state,
    polling: false,
    downloadLink: null
  })
}, initialState.pages.reporting)

export default reportingPageReducer
