import axios from 'axios'
import showNotification from './notification'


const logIn = async (credentials) => {
    const baseUrl = '/api/login'
    try {
        const response = await axios.post(baseUrl, credentials)
        console.log('Data received from backend', response.data)  
        showNotification("Login successful", "valid") 
        return response.data
    }
    catch (error) {
        console.log('Error message from server', error.response.data)
        showNotification(error.response.data, "error")
    }
}

export default { logIn }