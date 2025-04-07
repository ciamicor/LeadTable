import axios from 'axios'

// baseURL: 'https://leadtable.iami411.org',
// baseURL: 'http://127.0.0.1:3000/',

export default axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://leadtable.iami411.org'
  }
})
