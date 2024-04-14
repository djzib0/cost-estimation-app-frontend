import React from 'react'
// components imports
import CtaButton from '../buttons/CtaButton'
// styles imports
import './ModalYesNoButton.css'

export default function ModalYesNoButtons({itemId, confirmFunc, cancelFunc, onClose, refreshPage}) {

  function handleOnClick() {
    // call confirm function
    confirmFunc(itemId);
    // close modal after interaction with db
    onClose();
    // refresh default page
    refreshPage();
  }

  return (
    <div className='yes-no-btns__container'>
      <CtaButton 
                title="Confirm"
                type="warning"
                variant="large"
                handlingFunction={() => handleOnClick()}
                />
      <CtaButton 
                title="Cancel"
                type="cancel"
                variant="large"
                handlingFunction={cancelFunc}
                />
    </div>
  )
}
