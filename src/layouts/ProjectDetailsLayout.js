import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
// components imports
import ProjectDetailsDashboard from '../components/projects/allProjects/ProjectDetailsDashboard'

export default function ProjectDetailsLayout() {
  return (
    <div>
      <ProjectDetailsDashboard />
      <Outlet />
    </div>
  )
}
