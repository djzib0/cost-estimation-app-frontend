import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
//context import 
import { ThemeContext } from '../../App';
// styles import
import './MainContentHeaderLink.css';

export default function MainContentHeaderLink(props) {

  const { pathTo, title } = props

  const { theme } = useContext(ThemeContext)
  const themeMode = `--${theme}`

  return (
    <NavLink 
    to={pathTo} 
    className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
    :`main-content-header__link${themeMode}`}
    >
      {title}
    </NavLink>
  )
}
