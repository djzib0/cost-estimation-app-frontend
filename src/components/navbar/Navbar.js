import React, { useContext, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'
import '../../headlessComponents/switch/Switch.css'
import '../../App.css'

// components imports
import Switch from '../../headlessComponents/switch/index';
import NavbarItem from '../NavbarItem/NavbarItem';

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
import { BiSolidBook } from "react-icons/bi";

// utility functions imports
import capitalFirstLetter from '../../utils/utils';
// contexts imports
import { AuthUserContext, DefaultSettingsContext } from '../../App';

export default function Navbar() {

  const {authUser} = useContext(AuthUserContext);
  const { settings, handleRefreshPage, theme, switchTheme } = useContext(DefaultSettingsContext);
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
        {/* --== Navbar links ==-- */}
        <NavLink to={authUser ? ".." : "login"} 
          className={({isActive}) => isActive ? `main-navbar__button${themeMode}--active` : `main-navbar__button${themeMode}`}
          end>
          <NavbarItem title={authUser ? `${authUser.firstName.toUpperCase()}` : "LOGIN"} icon={<RiAccountBoxLine className='main-navbar__link__icon' />} />
        </NavLink>

        <NavLink to={"projects"} 
          className={({isActive}) => isActive ? `main-navbar__button${themeMode}--active` : `main-navbar__button${themeMode}`}
        >
          <NavbarItem title={"PROJECTS"} icon={<AiOutlineProject className='main-navbar__link__icon' />} />
        </NavLink>

        <NavLink to={"dictionaries"} 
          className={({isActive}) => isActive ? `main-navbar__button${themeMode}--active` : `main-navbar__button${themeMode}`}
        >
          <NavbarItem title={"DICTIONARIES"} icon={<BiSolidBook className='main-navbar__link__icon' />} />
        </NavLink>

        <NavLink to={"settings"} 
          className={({isActive}) => isActive ? `main-navbar__button${themeMode}--active` : `main-navbar__button${themeMode}`}
        >
          <NavbarItem title={"SETTINGS"} icon={<SlSettings className='main-navbar__link__icon' />} />
        </NavLink>
      </div>
    </nav>
  )
}