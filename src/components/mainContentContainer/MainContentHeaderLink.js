import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
//context import 
import { DefaultSettingsContext } from '../../App';
// styles import
import './MainContentHeaderLink.css';

export default function MainContentHeaderLink(props) {

  const { pathTo, title, isEnd } = props

  const { theme } = useContext(DefaultSettingsContext)
  const themeMode = `--${theme}`

  return (
    <NavLink 
    to={`${pathTo}`}
    end={isEnd}
    className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
    :`main-content-header__link${themeMode}`}
    >
      {title}
    </NavLink>
  )
}
