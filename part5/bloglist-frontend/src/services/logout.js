import axios from 'axios'
import showNotification from './notification'

const logOut = async () => {
  const baseUrl = '/api/logout'
  try {
    const response = await axios.get(baseUrl)
    console.log('Data received from backend', response.data)
    showNotification('Logout successful', 'valid')
    return response.data
  }
  catch (error) {
    console.log('Error message from server', error.response.data)
    showNotification(error.response.data, 'error')
  }
}

export default { logOut }