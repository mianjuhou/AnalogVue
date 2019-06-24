import axios from 'axios';
const service = axios.create({
  timeout: 10000,
  baseURL: process.env.BASE_API
})
export default service
