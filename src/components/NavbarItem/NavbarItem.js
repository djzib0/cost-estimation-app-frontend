import React from 'react';
import './NavbarItem.css'

export default function NavbarItem(props) {

  const { title, icon } = props
  return (
    <div className={`main-navbar__link__container`}>
      <p>{icon}</p>
      <p>{title}</p>
    </div>
  )
}
