import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset } from '../../features/tasks/tasksSlice'
import { createTask } from '../../features/tasks/tasksThunks'
import CreateTaskModal from '../../components/tasks/CreateTaskModal'

const CreateTask = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(true)
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tasks
  )
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (isError) {
      console.error('Task creation error:', message)
    }

    if (isSuccess) {
      dispatch(reset())
      setIsModalOpen(false)
      navigate('/tasks')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleSubmit = async (formData) => {
    try {
      console.log('Submitting task data:', formData)
      await dispatch(createTask(formData)).unwrap()
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }

  const handleClose = () => {
    setIsModalOpen(false)
    navigate('/tasks')
  }

  return (
    <CreateTaskModal
      isOpen={isModalOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  )
}

export default CreateTask