import React, { useContext } from 'react'
import { SwitchContext } from './Switch'

export default function SwitchLeftIcon({children, iconColor}) {

  const {on} = useContext(SwitchContext)

  const style = {
    color: iconColor,
  }
  return (
    !on && <div className='switch__left-icon' style={style}>{children}</div>
  )
}
