import axios from 'axios'
const baseUrl = '/api/comments'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('comments response:', response.data)
  return response.data
}

export default { getAll }