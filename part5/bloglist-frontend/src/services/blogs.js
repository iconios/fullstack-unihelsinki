import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const create = (newBlog) => {
  const config = {
    headers: { Authorization: token},
}

  const request =  axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

const update = (id, updateBlog) => {
  const updatedUrl = baseUrl.concat(`/${id}`)
  console.log('Updated Url', updatedUrl)
  const request = axios.put(updatedUrl, updateBlog)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token},
  }

  const deleteUrl = baseUrl.concat(`/${id}`)
  console.log('Blog Url for deletion', deleteUrl)
  const request = axios.delete(deleteUrl, config)
  return request.then(response => response.data)
}

export default { getAll, create, setToken, update, remove }