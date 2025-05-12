import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTasks, createTask, updateTask, deleteTask } from '../../features/tasks/tasksThunks'
import CreateTaskModal from '../../components/tasks/CreateTaskModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TaskList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks)
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchTasks = async () => {
      try {
        console.log('Fetching tasks for user:', user.email)
        const result = await dispatch(getTasks()).unwrap()
        console.log('Fetched tasks:', result)
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    }

    fetchTasks()
  }, [user, navigate, dispatch])

  // Add debug logging for tasks state changes
  useEffect(() => {
    console.log('Tasks state updated:', tasks)
  }, [tasks])

  const handleCreateTask = () => {
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData) => {
    try {      console.log('Creating task with data:', formData);
      const result = await dispatch(createTask(formData)).unwrap();
      console.log('Task created:', result);
      await dispatch(getTasks()).unwrap();
      setIsModalOpen(false);
      toast.success('Task created successfully!');
    } catch (error) {
      console.error('Failed to create task:', error)
      toast.error('Failed to create task. Please try again.')
    }
  }

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await dispatch(updateTask({ taskId, taskData: { completed } })).unwrap();
      toast.success(`Task marked as ${completed ? 'completed' : 'incomplete'}`);
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.error('Failed to update task status');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await dispatch(deleteTask(taskId)).unwrap();
        toast.success('Task deleted successfully');
      } catch (error) {
        console.error('Failed to delete task:', error);
        toast.error('Failed to delete task');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{message}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ToastContainer />      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome {user?.username ? `${user.username}` : `${user?.email}`} to Task Manager
        </h1>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Tasks</h2>
        <button
          onClick={handleCreateTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Task
        </button>
      </div>

      {tasks && tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found. Create your first task!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks && tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow"
            >              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    Created: {new Date(task.created_at).toLocaleString()}
                  </div>
                  {task.due_date && (
                    <div className="mt-1 text-sm text-gray-500">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end space-y-2">                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                    <button
                      onClick={() => handleToggleComplete(task.id, !task.completed)}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        task.completed
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {task.completed ? 'Completed' : 'Mark Complete'}
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}

export default TaskList