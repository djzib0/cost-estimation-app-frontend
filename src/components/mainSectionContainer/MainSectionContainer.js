import React from 'react'

export default function MainSectionContainer({children, themeMode}) {

  return (
    <div className={`main-section__container${themeMode}`}>
      {children}
    </div>
  )
}
