import {API} from "../constants/urls"
import axios from 'axios'

const rootPath = API.origin+API.assistants

async function listAssistants(token) {
  return axios.get(rootPath, {headers: {'Authorization': token}})
}

async function createAssistant(token, data) {
  return axios.post(rootPath, data, {headers: {'Authorization': token}})
}

async function updateAssistant(token, assistantId, data) {
  const url = `${rootPath}/${assistantId}`
  return axios.put(url, data, {headers: {'Authorization': token}})
}

export default {
  listAssistants,
  createAssistant,
  updateAssistant
}
