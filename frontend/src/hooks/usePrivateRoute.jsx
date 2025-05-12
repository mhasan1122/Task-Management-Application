import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const usePrivateRoute = () => {
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return null
}

export default usePrivateRoute