import authAPI from '../../api/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'

// In authThunks.js
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await authAPI.register(userData)
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response
    } catch (error) {
      console.error('Registration error:', error.response?.data)
      const message = error.response?.data?.message || 
                     error.response?.data?.detail || 
                     error.message || 
                     'Registration failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// In authThunks.js
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await authAPI.login(userData)
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response
    } catch (error) {
      const message = error.response?.data?.message || 
                     error.response?.data?.detail || 
                     error.message || 
                     'Login failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (refreshToken, thunkAPI) => {
    try {
      await authAPI.logout(refreshToken)
      localStorage.removeItem('user')
    } catch (error) {
      const message = error.response?.data?.message || 
                     error.response?.data?.detail || 
                     error.message || 
                     'Logout failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)