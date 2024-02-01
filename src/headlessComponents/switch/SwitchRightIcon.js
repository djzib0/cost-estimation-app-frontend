import React, { useContext } from 'react'
// context import
import { SwitchContext } from './Switch'

export default function SwitchRightIcon({children, iconColor}) {

  const {on} = useContext(SwitchContext)

  const style = {
    color: iconColor
  }

  return (
    on && <div className='switch__right-icon' style={style}>{children}</div>
  )
}
