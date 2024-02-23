import React from 'react'
// styles imports
import '../mainContentContainer/MainContentHeaderContainer.css'

export default function MainContentHeaderContainer({children}) {
  return (
    <div className='headers__container'> 
      {children}
    </div>
  )
}
