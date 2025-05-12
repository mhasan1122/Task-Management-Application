import React from 'react'
import Navbar from '../Navbar'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-8"
      >
        <Outlet />
      </motion.main>
    </div>
  )
}

export default Layout 