import axios from 'axios'

import {API} from '../constants/urls'

const rootPath = API.origin + API.employers

async function register(token, data) {
  return axios.post(rootPath, data, {headers: {'Authorization': token}})
}

async function getSelf(token) {
  return axios.get(`${rootPath}/self`, {headers: {'Authorization': token}})
}

async function update(token, data) {
  return axios.put(`${rootPath}/self`, data, {headers: {'Authorization': token}})
}

async function verifyRegistration(verificationToken) {
  return axios.post(`${rootPath}/verify`, null, {params: {token: verificationToken}})
}

async function changePassword(token, data) {
  return axios.post(`${rootPath}/self/password`, data, {headers: {'Authorization': token}})
}


export default {
  register,
  getSelf,
  update,
  verifyRegistration,
  changePassword
}
