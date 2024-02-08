import React from 'react'
// styles imports
import './ModalCloseButton.css'
// icons imports
import { IoCloseSharp } from "react-icons/io5";


export default function ModalCloseButton(props) {
  return (
    <button 
      className='modal__close-button'
      onClick={props.onClose}><IoCloseSharp />
      </button>
  )
}
