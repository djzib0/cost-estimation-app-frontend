import React from 'react'

export default function MaterialGradeHeadersContainer() {
  return (
    <div className='headers__container'> 
      <div className='header__container--narrow'>Id</div>
      <div className='header__container--regular'>European</div>
      <div className='header__container--regular'>German</div>
      <div className='header__container--regular'>Density {`[`}g/cm<sup>3</sup>{`]`}</div>
      <div className='header-cta__container'></div>
    </div>
  )
}
