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
    form: "",
    obj: {},
  }

  const [modalData, setModalData] = useState({initialModalData})

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

  console.log("jestem w modal", initialModalData.obj)

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
