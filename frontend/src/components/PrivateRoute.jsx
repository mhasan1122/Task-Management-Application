import React from 'react'
import usePrivateRoute from '../hooks/usePrivateRoute'

const PrivateRoute = ({ children }) => {
  const redirect = usePrivateRoute()

  if (redirect) {
    return redirect
  }

  return children
}

export default PrivateRoute