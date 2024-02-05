import React, { useState } from 'react'

function useModal() {

  const initialModalData = {
    isActive: false,
    modalType: "",
    messageTitle: "",
    messageText: "",
    elementId: "",
    newValue: "",
    handleFunction: "",
    form: ""
  }

  const [modalData, setModalData] = useState(initialModalData)

  function openModal() {
    setModalData(prevModalData => {
      return {
        ...prevModalData,
        isActive: true
      }
    })
  }

  function closeModal() {
    resetModal()
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
        resetModal
    }
  )
}

export default useModal
