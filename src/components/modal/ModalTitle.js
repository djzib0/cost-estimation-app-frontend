import React from 'react'
// styles imports
import './ModalTitle.css'

export default function ModalTitle(props) {

  const {title} = props
  return (
    <h3 className='modal__title'>{title}</h3>
  )
}
