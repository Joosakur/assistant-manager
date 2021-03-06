import {takeLatest, put, call, select} from 'redux-saga/effects'
import {toastr} from 'react-redux-toastr'
import moment from 'moment/moment'

import {
  listAssistants, listAssistantsSuccess, listAssistantsFail,
  listCoworkers,
  createAssistant, createAssistantSuccess, createAssistantFail,
  updateAssistant, updateAssistantSuccess, updateAssistantFail
} from '../actions/api/assistantActions'
import AssistantsApi from '../api/assistants'
import {selToken} from '../selectors/auth'
import {errorMessageFromApiError, submissionErrorFromApiError} from '../utils/errorUtils'
import s from '../localization'

export function* handleListAssistants() {
  const token = yield select(selToken)
  try {
    const response = yield call(AssistantsApi.listAssistants, token)
    yield put(listAssistantsSuccess(response.data))
  } catch (e) {
    yield call(toastr.error, s.assistants.errors.list, errorMessageFromApiError(e))
    yield put(listAssistantsFail())
  }
}

export function* handleListCoworkers({payload: assistantId}) {
  const token = yield select(selToken)
  try {
    const response = yield call(AssistantsApi.listCoworkers, token, assistantId)
    yield put(listAssistantsSuccess(response.data))
  } catch (e) {
    yield call(toastr.error, s.assistants.errors.list, errorMessageFromApiError(e))
    yield put(listAssistantsFail())
  }
}

export function* handleCreateAssistant({payload: formValues, meta: {resolve, reject}}) {
  const token = yield select(selToken)
  try {
    const data = buildPayload(formValues)
    const response = yield call(AssistantsApi.createAssistant, token, data)
    yield call(resolve)
    yield put(createAssistantSuccess(response.data))
  } catch (e) {
    yield call(toastr.error, s.assistants.errors.create, errorMessageFromApiError(e))
    yield call(reject, submissionErrorFromApiError(e))
    yield put(createAssistantFail())
  }
}

export function* handleUpdateAssistant({payload: formValues, meta: {resolve, reject}}) {
  const token = yield select(selToken)
  const {assistantId} = formValues
  if (!(assistantId && assistantId.length > 0)) {
    yield put(updateAssistantFail('Missing assistantId to update'))
    return
  }

  try {
    const data = buildPayload(formValues)
    const response = yield call(AssistantsApi.updateAssistant, token, assistantId, data)
    yield call(resolve)
    yield put(updateAssistantSuccess(response.data))
  } catch (e) {
    yield call(toastr.error, s.assistants.errors.edit, errorMessageFromApiError(e))
    yield call(reject, submissionErrorFromApiError(e))
    yield put(updateAssistantFail())
  }
}

const buildPayload = formValues => {
  const payload = {
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    birthday: moment(formValues.birthday, 'D.M.YYYY').format('YYYY-MM-DD'),
    active: true,
    backgroundColor: formValues.backgroundColor,
    textColor: formValues.whiteText ? '#ffffff' : '#000000'
  }
  if (formValues.nickName && formValues.nickName.length > 0) {
    payload.nickName = formValues.nickName
  }
  return payload
}

export default [
  takeLatest(listAssistants, handleListAssistants),
  takeLatest(listCoworkers, handleListCoworkers),
  takeLatest(createAssistant, handleCreateAssistant),
  takeLatest(updateAssistant, handleUpdateAssistant)
]
