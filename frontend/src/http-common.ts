import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export default axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json'
    // 'Access-Control-Allow-Origin': 'https://leadtable.iami411.org/'
  }
})
