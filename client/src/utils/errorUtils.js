import {SubmissionError} from 'redux-form'

export const submissionErrorFromApiError = e => {
  let error = {}
  if(!e.response || !e.response.data)
    error = {_error: 'Connection error'}
  else {
    let fieldErrors = e.response.data.fieldErrors
    if(fieldErrors) {
      for(let fieldError of fieldErrors) {
        error[fieldError.field] = fieldError.message
      }
      error._error = 'Validation failed'
    }

    let msg = e.response.data.message
    if(msg)
      error._error = msg
  }
  return new SubmissionError(error)
}

export const errorMessageFromApiError = e => {
  if(!e.response || !e.response.data) {
    return 'Could not connect to the server'
  }

  let msg = e.response.data.message
  return msg ? msg : 'Unknown error'
}
