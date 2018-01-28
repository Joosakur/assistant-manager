import {API} from '../constants/urls';
import {generalErrorFromApiError} from '../utils/errorUtils';
import axios from 'axios';
import {postVerificationBegin, postVerificationError, postVerificationSuccess} from "../actions/api/verificationActions";

export function postVerification(token) {
  return function (dispatch) {
    dispatch(postVerificationBegin());

    return axios.post(API.origin+API.employerVerification+"?token="+token)
      .then(() => {
        dispatch(postVerificationSuccess());
      })
      .catch(e => {
        let error = generalErrorFromApiError(e);
        dispatch(postVerificationError(error));
      });
  };
}
