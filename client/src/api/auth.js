import {API} from '../constants/urls'
import axios from 'axios'

export async function postLogin(email, password) {
  return axios.post(
    API.origin+API.login,
    {
      username: email,
      password
    },
    {
      withCredentials: true
    }
  )
}
