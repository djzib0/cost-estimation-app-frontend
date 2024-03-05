import React from 'react';
import { Outlet } from 'react-router-dom';
// components imports
import ProjectsMenu from '../pages/projects/projectsMenu/ProjectsMenu';

export default function ProjectsLayout() {
  return (
    <div>
      <ProjectsMenu />
      <Outlet />
    </div>
  )
}
