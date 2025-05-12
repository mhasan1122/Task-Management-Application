import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { useSelector } from 'react-redux'

const AuthPage = () => {
  const { token } = useSelector((state) => state.auth)

  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
    </div>
  )
}

export default AuthPage