import {SubmissionError} from 'redux-form'

import s from '../localization'

export const submissionErrorFromApiError = e => {
  let error = {}
  if(!e.response || !e.response.data)
    error = {_error: s.errorCodes.CONNECTION_ERROR}
  else {
    const fieldErrors = e.response.data.fieldErrors
    if(fieldErrors) {
      for(let fieldError of fieldErrors) {
        error[fieldError.field] = fieldError.message
      }
      error._error = s.errorCodes.VALIDATION_FAILED
    } else {
      error._error = errorMessageFromApiError(e)
    }
  }
  return new SubmissionError(error)
}

export const errorMessageFromApiError = e => {
  if(!e.response || !e.response.data) {
    return s.errorCodes.CONNECTION_ERROR
  }

  const { message, errorCode} = e.response.data
  if (errorCode && s.errorCodes[errorCode]) {
    return s.errorCodes[errorCode]
  }
  if (message) {
    console.warn(message)
  }
}
