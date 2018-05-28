import {API} from "../constants/urls"
import axios from 'axios'

const rootPath = API.origin+API.workShifts

async function listWorkShifts(token, params) {
  return axios.get(rootPath, {headers: {'Authorization': token}, params})
}

async function createWorkShift(token, data) {
  return axios.post(rootPath, data, {headers: {'Authorization': token}})
}

async function updateWorkShift(token, workShiftId, data) {
  const url = `${rootPath}/${workShiftId}`
  return axios.put(url, data, {headers: {'Authorization': token}})
}

export default {
  listWorkShifts,
  createWorkShift,
  updateWorkShift
}
