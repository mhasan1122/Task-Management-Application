import axios from 'axios'

const API_URL = 'http://localhost:8000/api/auth'

const register = async (userData) => {
  try {
    console.log('Registration data being sent:', userData)
    const response = await axios.post(`${API_URL}/register/`, userData)
    console.log('Registration response:', response.data)
    return response.data
  } catch (error) {
    console.error('Registration error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    })
    throw error
  }
}

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, userData)
    console.log('Login response:', response.data) // Debug log
    if (response.data.data) {
      const userData = response.data.data
      localStorage.setItem('user', JSON.stringify(userData))
    }
    return response.data
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message)
    throw error
  }
}

const logout = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_URL}/logout/`, { refresh_token: refreshToken })
    localStorage.removeItem('user')
    return response.data
  } catch (error) {
    console.error('Logout error:', error.response?.data || error.message)
    throw error
  }
}

const authAPI = {
  register,
  login,
  logout,
}

export default authAPI