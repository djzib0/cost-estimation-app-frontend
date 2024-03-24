import React from 'react'

export default function MainContentHeaderContainerItem({children, title, variant}) {
  return (
    <div className={`header__container--${variant}`}>{title}{children}</div>
  )
}
