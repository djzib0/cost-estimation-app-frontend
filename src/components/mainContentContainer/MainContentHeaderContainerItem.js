import React from 'react'
// styles imports
import './MainContentHeaderContainerItem.css'

export default function MainContentHeaderContainerItem(props) {

  const {
    variant,
    title,
    type,
    showInputField,
    inputName,
    handleChange,
    value,
    isFilterTitle,
  } = props

  return (
    <div className={`header__container--${variant}`}>
      <div className='header-input__container'>
      {showInputField && 
      <input className='filter__input'
      type={type}
      name={inputName}
      id={inputName}
      onChange={handleChange}
      value={value}
      />}
      {isFilterTitle && 
      "Filters:"}
      </div>
      <div className='header__title'>{title}</div>
    </div>
  )
}
