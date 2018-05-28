import {API} from "../constants/urls"
import axios from "axios"

async function getSelf(token) {
  return axios.get(API.origin+API.employers+"/self", {headers: {'Authorization': token}})
}

export default {
  getSelf
}
