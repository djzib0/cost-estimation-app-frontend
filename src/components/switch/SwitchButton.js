import React, { useContext } from 'react'
// context imports
import { SwitchContext } from './Switch'

export default function SwitchButton({ children }) {

  const { on, toggleSwitch } = useContext(SwitchContext)

  return (
    <button onClick={toggleSwitch} className='switch__button'>
      {children}
    </button>
  )
}
