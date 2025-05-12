import axios from 'axios'

const API_URL = 'http://localhost:8000/api/tasks'

const getTasks = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`${API_URL}/`, config)
    return response.data
  } catch (error) {
    console.error('Get tasks error:', error.response?.data || error.message)
    throw error
  }
}

const createTask = async (taskData, token) => {
  try {
    // Format the task data
    const formattedData = {
      ...taskData,
      due_date: taskData.due_date ? new Date(taskData.due_date).toISOString().split('T')[0] : null,
      priority: taskData.priority || 'medium',
      status: taskData.status || 'pending'
    }

    console.log('Creating task with formatted data:', formattedData)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await axios.post(`${API_URL}/`, formattedData, config)
    console.log('Create task response:', response.data)
    return response.data
  } catch (error) {
    console.error('Create task error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    })
    throw error
  }
}

const updateTask = async (taskId, taskData, token) => {
  try {
    // Get the current task data first
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    // Use PATCH instead of PUT for partial updates
    const response = await axios.patch(`${API_URL}/${taskId}/`, taskData, config)
    return response.data
  } catch (error) {
    console.error('Update task error:', error.response?.data || error.message)
    throw error
  }
}

const deleteTask = async (taskId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.delete(`${API_URL}/${taskId}/`, config)
    return response.data
  } catch (error) {
    console.error('Delete task error:', error.response?.data || error.message)
    throw error
  }
}

const tasksAPI = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
}

export default tasksAPI