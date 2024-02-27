import React from 'react'

export default function MainContentHeaderContainerItem({children, title}) {
  return (
    <div className='header__container'>{title}{children}</div>
  )
}
