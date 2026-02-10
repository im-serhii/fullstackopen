import axios from 'axios'

const baseUrl = '/api/auth'

export const login = async user => {
  const response = await axios.post(baseUrl, user)
  return response.data
}
