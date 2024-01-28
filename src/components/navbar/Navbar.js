import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

//icons imports
import { IoSettingsOutline } from "react-icons/io5";
//utility functions imports
import capitalFirstLetter from '../../utils/utils';
//contexts
import { AuthUserContext } from '../../App';

export default function Navbar() {

  const {authUser} = useContext(AuthUserContext);


  return (
    <div>
      <NavLink to={authUser ? ".." : "login"} 
        className={({isActive}) => isActive ? 'navbar__button--active' : "navbar__button"}
        end
      >
        <p>{authUser ? `${capitalFirstLetter(authUser.firstName)}` : "Login"}</p>
      </NavLink>
      
      <NavLink to={"settings"} 
        className={({isActive}) => isActive ? 'navbar__button--active' : "navbar__button"}
      >
        <p><IoSettingsOutline /></p>
      </NavLink>
    </div>
  )
}