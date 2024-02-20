import React, { useEffect, useState } from 'react'

function useModal() {

  const initialModalData = {
    isActive: false,
    modalType: "",
    messageTitle: "",
    messageText: "",
    errorText: "",
    handleFunction: "",
    form: "",
    refreshFunc: "",
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
    refreshFunc: "",
    obj: {},
  })

  useEffect(() => {
    console.log("refreshing useModal")
  }, [modalData])

  function openModal() {
    setModalData(prevData => {
      return {
        ...prevData,
        isActive: true,
      }
    })
  }

  async function closeModal() {
    console.log("closing useModal")
    resetModal();
  }

  async function resetModal() {
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
