import React, { useEffect, useState} from 'react';
import useModal from '../../customHooks/useModal';
// styles imports
import './Modal.css'

export default function Modal(props) {

  const {
    isActive,
    modalType,
    messageTitle, 
    messageText,
    errorText,
    elementId,
    value,
    onClose,
    handleFunction,
    refreshPage,
    form,
    obj
  } = props

  const {
    modalData,
    setModalData,
    closeModal,
  } = useModal()

  const [isDisabled, setIsDisabled] = useState(true)
  const [showInputError, setShowInputError] = useState(false)
  const [showDateError, setShowDateError] = useState(false)

  return (
    <div className='modal__container'>
      <button onClick={onClose}>Close modal window</button>
      <p>{modalData.messageTitle}</p>
      <p>{errorText}</p>
      <div>{form}</div>
    </div>
  )
}
