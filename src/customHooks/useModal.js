import React, { useState } from 'react'

function useModal() {

  const initialModalData = {
    isActive: false,
    modalType: "",
    messageTitle: "",
    messageText: "",
    errorText: "",
    elementId: "",
    newValue: "",
    handleFunction: "",
    form: "",
    obj: {},
  }

  const [modalData, setModalData] = useState({
    isActive: false,
    modalType: "",
    messageTitle: "",
    messageText: "",
    errorText: "",
    elementId: "",
    newValue: "",
    handleFunction: "",
    form: "",
    obj: {},
  })

  function openModal() {
    setModalData(prevModalData => {
      return {
        ...prevModalData,
        isActive: true
      }
    })
  }

  function updateModalData(property, value) {
    setModalData(prevData => {
      return {
        ...prevData,
        [property]: value
      }  
    })
  }

  function closeModal() {
    setModalData(prevData => {
      return {
        ...prevData,
        isActive: false,
      }
    })
  }

  function resetModal() {
    setModalData(initialModalData)
  }
  return (
    {
        modalData,
        setModalData,
        closeModal,
        openModal,
        updateModalData,
        resetModal
    }
  )
}


export default useModal
