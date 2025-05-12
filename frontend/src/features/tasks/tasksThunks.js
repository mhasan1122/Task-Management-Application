import tasksAPI from '../../api/tasks'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getTasks = createAsyncThunk(
  'tasks/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      return await tasksAPI.getTasks(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          (error.response.data.detail || error.response.data.message)) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      if (!token) {
        throw new Error('No authentication token found')
      }
      console.log('Creating task with data:', taskData)
      const response = await tasksAPI.createTask(taskData, token)
      console.log('Task created successfully:', response)
      return response
    } catch (error) {
      console.error('Task creation failed:', error)
      const message =
        (error.response &&
          error.response.data &&
          (error.response.data.detail || error.response.data.message)) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ taskId, taskData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      if (!token) {
        throw new Error('No authentication token found')
      }
      return await tasksAPI.updateTask(taskId, taskData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          (error.response.data.detail || error.response.data.message)) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      if (!token) {
        throw new Error('No authentication token found')
      }
      await tasksAPI.deleteTask(taskId, token)
      return taskId
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          (error.response.data.detail || error.response.data.message)) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)