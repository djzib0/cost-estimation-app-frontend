import React from 'react'
// styles imports
import './ModalMessageText.css'

export default function ModalText(props) {

  const {messageText} = props
  return (
    <div className='modal__message-text'>{messageText}</div>
  )
}
