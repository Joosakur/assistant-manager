import {API, SELF} from '../../src/constants/urls'
import {postRegistrationBegin, postRegistrationSuccess, postRegistrationError} from '../../src/actions/api/registrationActions'
import {push} from 'react-router-redux'
import {toastr} from 'react-redux-toastr'
import {formErrorFromApiError} from '../../src/utils/errorUtils'
import {SubmissionError} from 'redux-form'
import axios from 'axios'

export function postRegistration(registration) {
  return function (dispatch) {
    dispatch(postRegistrationBegin())

    let body = {
      email: registration.email,
      password: registration.password,
      firstName: registration.firstName,
      lastName: registration.lastName,
      birthday: new Date(),
      captcha: registration.captcha,
      city: registration.city,
      hetaMember: registration.hetaMember
    }

    return axios.post(API.origin+API.employers, body)
      .then(() => {
        dispatch(postRegistrationSuccess())
        dispatch(push(SELF.registered))
        toastr.success('Success', 'Account created')
      })
      .catch(e => {
        let error = formErrorFromApiError(e)
        dispatch(postRegistrationError(error))
        toastr.error("Error", error._error)
        throw new SubmissionError(error)
      })
  }
}
