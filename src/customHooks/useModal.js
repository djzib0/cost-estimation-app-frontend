import React, { useState } from 'react'

function useModal() {

  const initialModalData = {
    isActive: false,
    modalType: "",
    messageTitle: "",
    messageText: "",
    errorText: "",
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
    handleFunction: "",
    form: "",
    obj: {},
  })

  function openModal() {
    console.log("opening modal")
    setModalData(prevData => {
      return {
        ...prevData,
        isActive: true,
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
        resetModal
    }
  )
}


export default useModal
