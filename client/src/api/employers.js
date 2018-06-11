import axios from 'axios'

import {API} from '../constants/urls'

const rootPath = API.origin + API.employers

async function getSelf(token) {
  return axios.get(`${rootPath}/self`, {headers: {'Authorization': token}})
}

async function register(token, data) {
  return axios.post(rootPath, data, {headers: {'Authorization': token}})
}

async function verifyRegistration(verificationToken) {
  return axios.post(`${rootPath}/verify`, null, {params: {token: verificationToken}})
}

export default {
  getSelf,
  register,
  verifyRegistration
}
