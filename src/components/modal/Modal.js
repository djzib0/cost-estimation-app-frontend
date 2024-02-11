import React, { useContext, useEffect, useState} from 'react';
import useModal from '../../customHooks/useModal';
// components imports
import ModalCloseButton from './ModalCloseButton';
import ModalTitle from './ModalTitle';
import ModalMessageText from './ModalMessageText'
// styles imports
import './Modal.css'
// context imports
import { ThemeContext } from '../../App';
import ModalIcon from './ModalIcon';

export default function Modal(props) {

  const {theme} = useContext(ThemeContext)
  const themeMode = `--${theme}`

  const {
    modalType,
    messageTitle,
    messageText,
    handleFunction,
    onClose,
    form,
    errorText,
  } = props



  const {
    modalData,
    setModalData,
    closeModal,
  } = useModal()

  return (
    <div className={`modal__container${themeMode}`}>
      <ModalCloseButton onClose={onClose} />
      <ModalIcon type={modalType} />
      <ModalTitle title={messageTitle} />
      <ModalMessageText messageText={messageText} />
      <p>{modalData.messageTitle}</p>
      <p>{errorText}</p>

      {modalType === 'edit' && <div>{form}</div>}
      {modalType === 'add' && <div>{form}</div>}

    </div>
  )
}
