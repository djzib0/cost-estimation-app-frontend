import React, { useContext } from 'react'
// context imports
import { SwitchContext } from './Switch'

export default function SwitchButton({ children, apiFunc, arg, refreshPage, theme }) {

  const { on, toggleSwitch } = useContext(SwitchContext)

  console.log(`switch__button${theme}`)

  return (
    <button onClick={() => {
      apiFunc(arg); 
      toggleSwitch();
      refreshPage();
    }
    } 
      className={`switch__button${theme}`}>
      {children}
    </button>
  )
}
