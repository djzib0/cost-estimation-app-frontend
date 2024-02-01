import React, { useContext, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'
import '../../headlessComponents/switch/Switch.css'
import '../../App.css'

// components imports
import Switch from '../../headlessComponents/switch/index';

// images imports
import logoWhite from '../../images/costestimapplogo-white.png'
import logoBlack from '../../images/costestimapplogo-black.png'

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
  const { settings, handleRefreshPage, theme, switchTheme } = useContext(ThemeContext);
  const { changeSettingsTheme } = useApiChangeSettings();

  const themeMode = `--${theme}`

  return (
    <nav className={`container main-navbar${themeMode}`}>
      <div className='main-navbar__container--left'>
        {/* set logo white when dark mode is on */}
        {theme === 'dark' && <img 
          src={logoWhite} 
          alt="application logo"
          className='main-navbar__logo' />}
        {/* set logo dark when light mode is on */}
        {theme === 'light' && <img 
          src={logoBlack} 
          alt="application logo"
          className='main-navbar__logo' />}
      </div>
      <div className='main-navbar__container--right'>
        {/* switch headless component */}
        <Switch>
          <Switch.Button apiFunc={switchTheme} 
            arg={settings} 
            refreshPage={handleRefreshPage}
            theme={themeMode}
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