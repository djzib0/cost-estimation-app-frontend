import React, { useState } from 'react'
// custom hooks imports
import useModal from '../../../customHooks/useModal';

export default function MaterialGradeEditForm(props) {

  const {euSymbol, gerSymbol} = props.obj.item

  const {
    modalData,
    setModalData,
    closeModal,
  } = useModal()

  const [formData, setFormData] = useState(
    {euSymbol: euSymbol, gerSymbol: gerSymbol}
  )

  function handleSubmit(e) {
    e.preventDefault()
    console.log("Submitting")
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
      <p></p>
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
