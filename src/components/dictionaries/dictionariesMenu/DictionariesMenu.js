import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
// css import
import './DictionariesMenu.css'
// contexts import
import { ThemeContext } from '../../../App'
// components imports
import SideMenu from '../../../headlessComponents/sideMenu/index';

export default function DictionariesMenu() {

  const { theme } = useContext(ThemeContext)

  const themeMode = `--${theme}`

  return (
    <div>
      <div className={`side-menu__container${themeMode}`}>
      <SideMenu >
        <SideMenu.Header>
          <div className={`side-menu__header${themeMode}`}>DICTIONARIES</div>
        </SideMenu.Header>
        <SideMenu.Item>

          <NavLink to={"gradesdictionary"} 
            className={({isActive}) => isActive ? `side-menu__item${themeMode}--active` : `side-menu__item${themeMode}`}
          >
            MATERIAL GRADES
          </NavLink>

          <NavLink to={"operations"} 
            className={({isActive}) => isActive ? `side-menu__item${themeMode}--active` : `side-menu__item${themeMode}`}
          >
            OPERATIONS
          </NavLink>

        </SideMenu.Item>
      </SideMenu>
    </div>
    </div>
  )
}
