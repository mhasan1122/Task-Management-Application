import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { reset } from '../../features/tasks/tasksSlice'
import { getTasks } from '../../features/tasks/tasksThunks' // Changed import source
import TaskList from '../../components/tasks/TaskList'

const Tasks = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getTasks())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Tasks</h1>
        <Link
          to="/tasks/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Create Task
        </Link>
      </div>
      <TaskList />
    </div>
  )
}

export default Tasks