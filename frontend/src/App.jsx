import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import TaskList from './pages/tasks/TaskList'
import CreateTask from './pages/tasks/CreateTask'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
        <Route path="tasks/create" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
      </Route>
    </Routes>
  )
}

export default App