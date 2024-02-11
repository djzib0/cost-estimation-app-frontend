import React, { useState } from 'react'
// custom hooks imports
import useModal from '../../../customHooks/useModal';
import useDictionariesApi from '../../../customHooks/useDictionariesApi';
//utils imports
import { isEmpty } from '../../../utils/utils';

export default function MaterialGradeEditForm(props) {

  const {materialGradeId, euSymbol, gerSymbol} = props.obj;
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState(
    {euSymbol: euSymbol, gerSymbol: gerSymbol}
  )

  const {
    addMaterialGrade,
  } = useDictionariesApi();

  const {
    closeModal
  } = useModal();

  function handleSubmit(e) {
    e.preventDefault()
    console.log(props.type)
    if (isEmpty(formData.euSymbol)) {
      setErrorMessage("cannot be empty")
    }
    if (props.type === "add") {
      addMaterialGrade(props.obj)
      closeModal()
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
