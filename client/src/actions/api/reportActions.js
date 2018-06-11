import { createAction } from 'redux-actions'

const requestReport = createAction('API__REPORTS__REQUEST', payload => payload, (payload, meta) => meta)
const requestReportSuccess = createAction('API__REPORTS__REQUEST_SUCCESS')
const requestReportFail = createAction('API__REPORTS__REQUEST_FAIL')

const getReport = createAction('API__REPORTS__GET')
const getReportSuccess = createAction('API__REPORTS__GET_SUCCESS')
const getReportFail = createAction('API__REPORTS__GET_FAIL')

export {
  requestReport, requestReportSuccess, requestReportFail,
  getReport, getReportSuccess, getReportFail
}
