import {API, SELF} from '../constants/urls';
import {postRegistrationBegin, postRegistrationSuccess, postRegistrationError} from '../actions/registrationActions';
import {push} from 'react-router-redux';
import {toastr} from 'react-redux-toastr';
import {formErrorFromApiError} from '../utils/errorUtils';
import {SubmissionError} from 'redux-form';
import axios from 'axios';

export function postRegistration(registration) {
  return function (dispatch) {
    dispatch(postRegistrationBegin());

    let body = {
      email: registration.email,
      password: registration.password,
      firstName: registration.firstName,
      lastName: registration.lastName,
      birthday: new Date()
    };

    return axios.post(API.origin+API.employers, body, {withCredentials: true})
      .then(() => {
        dispatch(postRegistrationSuccess());
        dispatch(push(SELF.login));
        toastr.success('Success', 'You can now login!');
      })
      .catch(e => {
        let error = formErrorFromApiError(e);
        dispatch(postRegistrationError(error));
        toastr.error("Error", error._error);
        throw new SubmissionError(error);
      });
  };
}
