import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
// css import
import './ProjectsMenu.css'
// contexts import
import { ThemeContext } from '../../../App'
// components imports
import SideMenu from '../../../headlessComponents/sideMenu/index';

export default function ProjectsMenu() {

  const { theme } = useContext(ThemeContext)

  const themeMode = `--${theme}`

  return (
    <div>
      <div className={`side-menu__container${themeMode}`}>
      <SideMenu >
        <SideMenu.Header>
          <div className={`side-menu__header${themeMode}`}>PROJECTS</div>
        </SideMenu.Header>
        <SideMenu.Item>

          <NavLink to={"allProjects"} 
            className={({isActive}) => isActive ? `side-menu__item${themeMode}--active` : `side-menu__item${themeMode}`}
          >
            ALL PROJECTS
          </NavLink>

          <NavLink to={"searchProjects"} 
            className={({isActive}) => isActive ? `side-menu__item${themeMode}--active` : `side-menu__item${themeMode}`}
          >
            SEARCH PROJECTS
          </NavLink>

        </SideMenu.Item>
      </SideMenu>
    </div>
    </div>
  )
}
