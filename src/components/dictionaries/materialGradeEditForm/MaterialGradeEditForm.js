import React, { useState } from 'react'
// custom hooks imports
import useModal from '../../../customHooks/useModal';
//utils imports
import { isEmpty } from '../../../utils/utils';

export default function MaterialGradeEditForm(props) {

  const {materialGradeId, euSymbol, gerSymbol} = props.obj.item;
  const [errorMessage, setErrorMessage] = useState("");

  const {
    modalData,
    setModalData,
    closeModal,
    openModal,
    updateModalData
  } = useModal()

  const [formData, setFormData] = useState(
    {euSymbol: euSymbol, gerSymbol: gerSymbol}
  )

  function handleSubmit(e) {
    e.preventDefault()
    if (isEmpty(formData.euSymbol)) {
      setErrorMessage("cannot be empty")
    }
  }

  function handleChange(e) {
    const {name, value, type, checked} = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  return (
    <div>
      <p>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="EU Symbol"
          name="euSymbol"
          onChange={handleChange} 
          value={formData.euSymbol}
        />
        <input
          type="text"
          placeholder="German Symbol"
          name="gerSymbol"
          onChange={handleChange} 
          value={formData.gerSymbol}
        />
      <button>Submit</button>
      </form>
      </div>
  )
}
