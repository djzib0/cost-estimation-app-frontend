import React from 'react'
import { Outlet } from 'react-router-dom'
// components imports
import Navbar from '../components/navbar/Navbar'
export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
