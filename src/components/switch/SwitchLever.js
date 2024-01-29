import React, { useContext } from 'react'
//contexts imports
import { SwitchContext } from './Switch'

export default function SwitchLever({children, leverColor}) {

  const {on} = useContext(SwitchContext)
  
  const style = {
    backgroundColor: leverColor
  }

  return (
    on ? <div className="switch__lever--left" style={style}>{children}</div>
    : <div className="switch__lever--right" style={style}>{children}</div>
  )
}
