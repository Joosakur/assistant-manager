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

async function deleteWorkShift(token, workShiftId) {
  const url = `${rootPath}/${workShiftId}`
  return axios.delete(url, {headers: {'Authorization': token}})
}

async function pasteDay(token, from, to) {
  const url = `${rootPath}/copy-day`
  return axios.post(url, null, {headers: {'Authorization': token}, params: {from, to}})
}

export default {
  listWorkShifts,
  createWorkShift,
  updateWorkShift,
  deleteWorkShift,
  pasteDay
}
