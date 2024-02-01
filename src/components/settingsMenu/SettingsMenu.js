import React from 'react';
import { Link } from 'react-router-dom';
import SideMenu from '../../headlessComponents/sideMenu/index';
import './SettingsMenu.css'


export default function SettingsMenu({children}) {

  return (
    <div className="settings-menu__container">
      <SideMenu >
        <SideMenu.Item>Item 1</SideMenu.Item>
        <SideMenu.Item>Item 2</SideMenu.Item>
        <SideMenu.Item>Item 3</SideMenu.Item>
        <SideMenu.Item>Item 4</SideMenu.Item>
      </SideMenu>
    </div>
  )
}
