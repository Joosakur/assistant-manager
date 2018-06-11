import { delay } from 'redux-saga'
import {takeLatest, put, call, select} from 'redux-saga/effects'
import {toastr} from 'react-redux-toastr'
import moment from 'moment'

import {
  requestReport, requestReportSuccess, requestReportFail,
  getReport, getReportSuccess, getReportFail
} from '../actions/api/reportActions'
import ReportStatuses from '../constants/reportStatuses'
import ReportingApi from '../api/reporting'
import {selToken} from '../selectors/auth'
import {submissionErrorFromApiError, errorMessageFromApiError} from '../utils/errorUtils'
import s from '../localization'

function* handleRequestReport({payload: formValues, meta: {resolve, reject}}) {
  const token = yield select(selToken)
  try {
    const data = buildPayload(formValues)
    const { data: { id: exportId } } = yield call(ReportingApi.requestReport, token, data)
    yield call(resolve)
    yield put(requestReportSuccess(exportId))
    yield put(getReport(exportId))
  } catch (e) {
    yield call(reject, submissionErrorFromApiError(e))
    yield call(toastr.error, s.reporting.errors.request, errorMessageFromApiError(e))
    yield put(requestReportFail())
  }
}

function* handleGetReportFail() {
  yield call(toastr.error, s.reporting.errors.download, s.reporting.errors.tryAgain)
}

function* handleGetReport({payload: exportId}) {
  const token = yield select(selToken)
  const retries = 20
  const pollDelay = 1500

  for (let i=0; i<retries; i++) {
    try {
      const { data: { status, downloadLink } } = yield call(ReportingApi.getReport, token, exportId)
      switch (status) {
        case ReportStatuses.COMPLETED:
          yield put(getReportSuccess(downloadLink))
          return
        case ReportStatuses.RECEIVED:
          if (i < retries-1) {
            yield call(delay, pollDelay)
          }
          break
        case ReportStatuses.ERROR:
        default:
          yield put(getReportFail())
          return
      }
    } catch (e) {
      break
    }
  }

  yield put(getReportFail())
}

const buildPayload = form => {
  const { year, month, range, startDate, endDate, assistant: assistantId } = form
  let from, to

  if(year && month) {
    //first day of the month
    from = moment().year(year).month(month).date(1)
    //last day of the month = first day of the next month minus one day
    to = moment().year(year).month(month).date(1).add(1,'months').add(-1, 'days')

    if(range === '1') {
      to = endDate.date(15)
    }
    else if(range === '2') {
      from = startDate.date(16)
    }
  }
  else {
    from = moment(startDate, 'D.M.YYYY').format('YYYY-MM-DD')
    to = moment(endDate, 'D.M.YYYY').format('YYYY-MM-DD')
  }

  return {
    assistantId,
    from,
    to
  }
}

export default [
  takeLatest(requestReport, handleRequestReport),
  takeLatest(getReport, handleGetReport),
  takeLatest(getReportFail, handleGetReportFail)
]
