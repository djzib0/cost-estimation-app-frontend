import React from 'react'
import { Outlet } from 'react-router-dom'
// components imports
import OperationsDashboard from '../components/dictionaries/operations/OperationsDashboard'

export default function PipesLayout({children}) {
  return (
    <div>
        <OperationsDashboard />
        <Outlet />
    </div>
  )
}

