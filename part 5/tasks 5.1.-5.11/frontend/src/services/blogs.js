import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (data) => {

  const config = {
    headers: {
      Authorization: token,
    }
  }

  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const updateBlog = async (id, data) => {
  const response = await axios.put(`${baseUrl}/${id}`, data)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config,)
  return response.data
}

export default { getAll, setToken, addBlog, updateBlog, deleteBlog }
