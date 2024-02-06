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
    elementId,
    value,
    onClose,
    handleFunction,
    refreshPage,
    form,
    obj
  } = props


  const [formData, setFormData] = useState({
    // property for an update or add
    newValue: value,
    date: ""
  })

  const [isDisabled, setIsDisabled] = useState(true)
  const [showInputError, setShowInputError] = useState(false)
  const [showDateError, setShowDateError] = useState(false)

  useEffect(() => {
    // if input for newValue is empty or contains only white
    // spaces, the button remains disabled
    // checks date input, if it's not chosen
    // the button remains disabled

    // checks input after "trimming" white spaces
    if (formData.newValue && formData.newValue.trim() && formData.date) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [formData])


  function handleFormChange(e) {
    const {name, value} = e.target
    setFormData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }


  return (
    <div className='modal__container'>
      <button onClick={onClose}>Close modal window</button>
      Expect the modal here my mate.
      <div>{form}</div>
    </div>
  )
}
