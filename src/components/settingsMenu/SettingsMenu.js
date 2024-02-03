import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// components imports
import SideMenu from '../../headlessComponents/sideMenu/index';
// styles imports
import './SettingsMenu.css'
//contexts imports
import { ThemeContext } from '../../App';


export default function SettingsMenu({children}) {

  const { theme } = useContext(ThemeContext)

  const themeMode = `--${theme}`

  return (
    <div className={`side-menu__container${themeMode}`}>
      <SideMenu >
        <SideMenu.Header>
          <div className={`side-menu__header${themeMode}`}>SETTINGS</div>
        </SideMenu.Header>
        <SideMenu.Item>
            <div className={`side-menu__item${themeMode}`}>
              Side Menu Item 1
            </div> 
        </SideMenu.Item>
        <SideMenu.Item>
          <div className={`side-menu__item${themeMode}`}>
            Side Menu Item 2
          </div> 
        </SideMenu.Item>
        <SideMenu.Item>
          <div className={`side-menu__item${themeMode}`}>
            Side Menu Item 3
          </div> 
        </SideMenu.Item>
      </SideMenu>
    </div>
  )
}
