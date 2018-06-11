import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

export const setupAxiosForTests = () => {
  axios.defaults.adapter = httpAdapter
}
