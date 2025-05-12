import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout as logoutAction } from '../features/auth/authSlice' // Updated import
import { logoutUser } from '../features/auth/authThunks'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logoutUser(user.refresh))
    dispatch(logoutAction()) // Updated action dispatch
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">
                  Task Manager
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  to="/tasks"
                  className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-primary-500 hover:text-white transition duration-300"
                >
                  Tasks
                </Link>
                <button
                  onClick={onLogout}
                  className="py-2 px-2 font-medium text-white bg-primary-500 rounded hover:bg-primary-600 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-primary-500 hover:text-white transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-2 font-medium text-white bg-primary-500 rounded hover:bg-primary-600 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar