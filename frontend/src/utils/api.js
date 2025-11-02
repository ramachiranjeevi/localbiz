import axios from 'axios'

const BASE = import.meta.env.VITE_BACKEND_URL || ''

export const generate = (payload) => axios.post(`${BASE}/api/generate`, payload)