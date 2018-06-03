import axios from 'axios'

import {API} from '../constants/urls'

const rootPath = API.origin+API.reporting

async function requestReport(token, data) {
  return axios.post(rootPath, data, {headers: {'Authorization': token}})
}

async function getReport(token, id) {
  return axios.get(`${rootPath}/${id}`, {headers: {'Authorization': token}})
}

export default {
  requestReport,
  getReport
}
