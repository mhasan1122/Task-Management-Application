import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { reset } from '../../features/tasks/tasksSlice'
import { getTasks, updateTask } from '../../features/tasks/tasksThunks' // Fixed import source
import TaskForm from '../../components/tasks/TaskForm'

const EditTask = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { tasks, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tasks
  )
  const { user } = useSelector((state) => state.auth)

  const task = tasks.find((task) => task.id === parseInt(id))

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (!task) {
      dispatch(getTasks())
    }

    if (isError) {
      console.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/tasks')
    }
  }, [user, task, isError, isSuccess, message, navigate, dispatch, id])

  const handleSubmit = (formData) => {
    dispatch(updateTask({ taskId: id, taskData: formData }))
  }

  if (isLoading || !task) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
      </div>
      <TaskForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        initialValues={task}
      />
    </div>
  )
}

export default EditTask