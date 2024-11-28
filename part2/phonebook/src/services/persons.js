import axios from 'axios'
const baseUrl = 'http://localhost:3005/persons'

function getAll() {
  const data = axios.get(baseUrl);
  return data.then(response => response.data);
}

function create(newObject) {
  const data = axios.post(baseUrl, newObject);
  return data.then(response => response.data);
}

function update(id, newObject) {
  const  data = axios.put(`${baseUrl}/${id}`, newObject);
  return data.then(response => response.data);
}

function remove(id) {
    const data = axios.delete(`${baseUrl}/${id}`);
    return data.then(response => response.data);
}

export default { getAll, create, update, remove }