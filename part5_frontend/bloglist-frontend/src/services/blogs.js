import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  console.log('Token!: ', token)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  console.log('update response:', response)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    console.log('delete resp', response)
    return response.data
  } catch (error) {
    console.log('deleting error', error)
  }
}

const commentCreat = async (id, newComment) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.post(`${baseUrl}/${id}/comments`, newComment, config)
    console.log('blog comment response',response)
    return response.data
  }catch (error) {
    console.log(error)
  }
}

export default { getAll, create, setToken, update, remove, commentCreat }
