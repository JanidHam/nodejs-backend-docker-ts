import axios from 'axios'

const PORT = process.env.PORT || 3000
const instance = axios.create({
  baseURL: `http://localhost:${PORT}`,
  timeout: 3500,
})

export {
  instance,
}
