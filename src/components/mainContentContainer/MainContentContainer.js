import React from 'react'
// styles imports
import '../mainContentContainer/MainContentContainer.css'

export default function MainContentContainer({children}) {
  return (
    <div className='main-content__container'>
      {children}
    </div>
  )
}
