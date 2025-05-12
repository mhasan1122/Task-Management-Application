import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const TaskCard = ({ task, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              task.completed
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        <p className="mt-2 text-gray-600">{task.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(task.created_at).toLocaleDateString()}
          </span>
          <div className="flex space-x-2">
            <Link
              to={`/tasks/edit/${task.id}`}
              className="text-primary-600 hover:text-primary-800 text-sm font-medium"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard