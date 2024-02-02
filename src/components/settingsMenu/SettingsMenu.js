import React from 'react';
import { Link } from 'react-router-dom';
// components imports
import SideMenu from '../../headlessComponents/sideMenu/index';
import SideMenuItem from '../SideMenuItem/SideMenuItem';
import './SettingsMenu.css'


export default function SettingsMenu({children}) {

  return (
    <div className="settings-menu__container">
      <SideMenu >
        <SideMenu.Item>
          <SideMenuItem title={"Side Menu Item 1"}/>
        </SideMenu.Item>
        <SideMenu.Item>
          <SideMenuItem title={"Side Menu Item 2"}/>
        </SideMenu.Item>
        <SideMenu.Item>
          <SideMenuItem title={"Side Menu Item 3"}/>
        </SideMenu.Item>
        
      </SideMenu>
    </div>
  )
}
