import React, { useContext, useEffect, useState } from 'react'
// custom hooks imports
import useModal from '../../../customHooks/useModal';
import useDictionariesApi from '../../../customHooks/useDictionariesApi';
//components imports
import CtaButton from '../../buttons/CtaButton';
import FormError from '../../form/FormError';
//contexts imports
import { ModalContext } from '../../../App';
//utils imports
import { isEmpty, isNumber, isEqualZero, capitalFirstLetter } from '../../../utils/utils';

export default function MaterialGradeEditForm(props) {

  // utilize ModalContext
  const {isModalOn, toggleModalOn, toggleModalOff} = useContext(ModalContext)

  const {materialGradeId, euSymbol, gerSymbol, gradeGroup, density} = props.obj;
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [formData, setFormData] = useState(
    {
      euSymbol: euSymbol,
      gerSymbol: gerSymbol,
      gradeGroup: gradeGroup === "" ? "steel" : gradeGroup,
      density: Number(density)
    }
  )

  const {
    addMaterialGrade,
    getMaterialGroupTypes,
    editMaterialGrade,
    fetchError,
    materialGroupTypes,
    loading,
    setLoading,
  } = useDictionariesApi(toggleModalOn, toggleModalOff);

  function handleSubmit(e) {
    e.preventDefault()
    console.log("submitting")
    // Check for errors
    if (isEmpty(formData.euSymbol)) {
      setErrorMessage("European symbol cannot be empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.density)) {
      setErrorMessage("Density cannot be empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEqualZero(formData.density)) {
      setErrorMessage("Density cannot have value zero.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }


    //if there are no input errors call requested method function
    if (props.type === "add") {
      addMaterialGrade({
        materialGradeId: props.obj.materialGradeId,  
        ...formData        
      });
      props.refreshPage();
      return
    }

    if (props.type === "edit") {
      editMaterialGrade({
        materialGradeId: props.obj.materialGradeId,  
        ...formData        
      });
    }
    props.refreshPage();
    return
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


  //fetch material group types
  useEffect(() => {
    getMaterialGroupTypes();
  }, [])

  // if data is fetched
  const materialGroupsArr = materialGroupTypes && materialGroupTypes.map(item => {
    const {materialGroupId, groupName} = item
    return (
      <option 
        key={materialGroupId}
        value={groupName}
      >
        {capitalFirstLetter(groupName)}
      </option>
    )
  })

  return (
    <div>
      {isError && <FormError errorMessage={errorMessage} />}
      {fetchError && <FormError errorMessage={fetchError.message} />}
      <form className='form--2xfr'>
        <div className='input-label__container'>
          <label htmlFor='euSymbol'>
            Eu symbol:
          </label>
          <input
            type="text"
            placeholder="EU Symbol"
            name="euSymbol"
            id="euSymbol"
            onChange={handleChange} 
            value={formData.euSymbol}
          />
        </div>
        <div className='input-label__container'>
          <label htmlFor='gerSymbol'>
            German symbol:
          </label>
          <input
            type="text"
            placeholder="German Symbol"
            name="gerSymbol"
            id="gerSymbol"
            onChange={handleChange} 
            value={formData.gerSymbol}
          />
        </div>
        <div className='input-label__container'>
          <label htmlFor='density'>
            Density:
          </label>
          <input
            type="number"
            placeholder="Density"
            name="density"
            id="density"
            onChange={handleChange} 
            value={formData.density}
          />
        </div>
        <div className='input-label__container'>
          <label htmlFor='gradeGroup' >
            Material group:
          </label>
          <select
            value={formData.gradeGroup}
            onChange={handleChange}
            name="gradeGroup"
            id="gradeGroup"
          >
            {materialGroupsArr}
          </select>
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
