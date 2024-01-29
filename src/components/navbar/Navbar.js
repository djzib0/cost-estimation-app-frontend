import React, { useContext, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'
import '../switch/Switch.css'
import '../../App.css'

// components imports
import Switch from '../switch/index';

// custom hooks imports
import useApiChangeSettings from '../../customHooks/useApiChangeSettings'

// icons imports
import { RiAccountBoxLine } from "react-icons/ri";
import { AiOutlineProject } from "react-icons/ai";
import { SlSettings } from "react-icons/sl";
import { IoMdSunny } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";

// utility functions imports
import capitalFirstLetter from '../../utils/utils';
// contexts imports
import { AuthUserContext, ThemeContext } from '../../App';

export default function Navbar() {

  const {authUser} = useContext(AuthUserContext);
  const { settings, handleRefreshPage } = useContext(ThemeContext);
  const { changeSettingsTheme } = useApiChangeSettings();

  const themeMode = settings && `--${settings.theme}`

  console.log(`main-navbar__button${themeMode}--active`)
  return (
    <nav className={`container main-navbar${themeMode}`}>
      <div className='main-navbar__container--left'>
        Logo
      </div>
      <div className='main-navbar__container--right'>
        <Switch>
          <Switch.Button apiFunc={changeSettingsTheme} 
            arg={settings} 
            refreshPage={handleRefreshPage}
          >
            <Switch.Lever leverColor={"#7b7f83"} />
            <Switch.LeftIcon iconColor={"black"}>
              <IoMdSunny />
            </Switch.LeftIcon>
            <Switch.RightIcon iconColor={"black"}>
              <IoMdMoon/>
            </Switch.RightIcon>
          </Switch.Button>
        </Switch>
        <NavLink to={authUser ? ".." : "login"} 
          className={({isActive}) => isActive ? `main-navbar__button${themeMode}--active` : `main-navbar__button${themeMode}`}
          end
        >
          <div className={`main-navbar__link__container`}>
            <RiAccountBoxLine className='main-navbar__link__icon' />
            <p>{authUser ? `${authUser.firstName.toUpperCase()}` : "Login"}</p>
          </div>
        </NavLink>

        <NavLink to={"projects"} 
          className={({isActive}) => isActive ? `main-navbar__button${themeMode}--active` : `main-navbar__button${themeMode}`}
        >
          <div className={`main-navbar__link__container`}>
            <p><AiOutlineProject className='main-navbar__link__icon'/></p>
            <p>PROJECTS</p>
          </div>
        </NavLink>

        
        <NavLink to={"settings"} 
          className={({isActive}) => isActive ? `main-navbar__button${themeMode}--active` : `main-navbar__button${themeMode}`}
        >
          <div className={`main-navbar__link__container`}>
            <p><SlSettings className='main-navbar__link__icon'/></p>
            <p>SETTINGS</p>
          </div>
        </NavLink>
      </div>
    </nav>
  )
}