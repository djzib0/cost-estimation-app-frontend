import React, { useContext, useEffect, useState } from 'react';
// custom hooks imports
import useModal from '../../../customHooks/useModal';
//components imports
import CtaButton from '../../../components/buttons/CtaButton'
import FormError from '../../../components/form/FormError';
// contexts imports
import { ModalContext } from '../../../App';
// utils imports
import { isEmpty, isNumber, isEqualZero, capitalFirstLetter } from '../../../utils/utils';
import useApi from '../../../customHooks/useApi';

export default function UnitsForm(props) {

  // utilize ModalContext
  const {isModalOn, toggleModalOn, toggleModalOff} = useContext(ModalContext)
  
  const {unitName, unitNameAbbreviation} = props.obj;

  // state variables
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [formData, setFormData] = useState(
    {
      unitName: unitName,
      unitNameAbbreviation: unitNameAbbreviation
    }
  )

  const {
    getData,
    addData,
    editData,
    fetchError,
  } = useApi();

  function handleSubmit(e) {
    e.preventDefault()
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
      {isError && <FormError errorMessage={errorMessage} />}
      {fetchError && <FormError errorMessage={fetchError.message} />}
      <form className='form--2xfr'>
        <div className='input-label__container'>
          <label htmlFor='euSymbol'>
            Unit name:
          </label>
          <input
            type="text"
            placeholder="Unit name"
            name="unitName"
            id="unitName"
            onChange={handleChange} 
            value={formData.unitName}
          />
        </div>
        <div className='input-label__container'>
          <label htmlFor='unitNameAbbreviation'>
            Abbreviation:
          </label>
          <input
            type="text"
            placeholder="Abbreviation"
            name="unitNameAbbreviation"
            id="unitNameAbbreviation"
            onChange={handleChange} 
            value={formData.unitNameAbbreviation}
          />
        </div>

      </form>
      <div className='form-buttons__container'>
        <CtaButton 
          title="Save"
          type="add"
          variant="large"
          handlingFunction={handleSubmit}
        />
        <CtaButton 
          title="Cancel"
          type="cancel"
          variant="large"
          handlingFunction={() => props.closeModal()}
        />
       </div>
    </div>
  )
}
