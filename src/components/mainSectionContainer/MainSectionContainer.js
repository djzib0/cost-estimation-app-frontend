import React from 'react'

export default function MainSectionContainer({children, themeMode}) {

  console.log(themeMode + " in section container")
  return (
    <div className={`main-section__container${themeMode}`}>{children}</div>
  )
}
