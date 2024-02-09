import React from 'react'
import { Outlet } from 'react-router-dom'
// components imports
import PipesDashboard from '../components/dictionaries/pipes/PipesDashboard'

export default function PipesLayout({children}) {
  return (
    <div>
        <PipesDashboard />
        <Outlet />
    </div>
  )
}
