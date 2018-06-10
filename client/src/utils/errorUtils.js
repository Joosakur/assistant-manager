import {SubmissionError} from 'redux-form'

const messageFromFieldError = fieldError => {
  const {field, message, arguments: args} = fieldError
  return message // todo: localize
}

export const submissionErrorFromApiError = e => {
  let error = {}
  if(!e.response || !e.response.data)
    error = {_error: 'Connection error'}
  else {
    const fieldErrors = e.response.data.fieldErrors
    if(fieldErrors) {
      for(let fieldError of fieldErrors) {
        error[fieldError.field] = messageFromFieldError(fieldError)
      }
      error._error = 'Validation failed'
    }

    const msg = e.response.data.message
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
