import React, { createContext, useState } from 'react'

// contexts
const SwitchContext = createContext();

export default function Switch({ children }) {

  const [on, setOn] = useState(false);

  function toggleSwitch() {
    setOn(prevOn => !prevOn)
  }

  return (
    <SwitchContext.Provider value={{on, toggleSwitch}}>
      {children}
    </SwitchContext.Provider>
  )
};

export { SwitchContext };
