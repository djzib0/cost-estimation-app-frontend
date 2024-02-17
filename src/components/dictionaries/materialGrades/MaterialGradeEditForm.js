import React, { useEffect, useState } from 'react'
// custom hooks imports
import useModal from '../../../customHooks/useModal';
import useDictionariesApi from '../../../customHooks/useDictionariesApi';
//utils imports
import { isEmpty, isNumber, capitalFirstLetter } from '../../../utils/utils';

export default function MaterialGradeEditForm(props) {

  const {materialGradeId, euSymbol, gerSymbol, gradeGroup, density} = props.obj;
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false)

  const [formData, setFormData] = useState(
    {
      euSymbol: euSymbol,
      gerSymbol: gerSymbol,
      gradeGroup: gradeGroup === "" ? "steel" : gradeGroup,
      density: Number(density)
    }
  )

  useEffect(() => {
    // prevent submit if there are errors
    if (!isError) {
      setAllowSubmit(true)
    }
  }, [isError, errorMessage])
  
  const {
    addMaterialGrade,
    getMaterialGroupTypes,
    editMaterialGrade,
    materialGroupTypes
  } = useDictionariesApi();

  function handleSubmit(e) {
    e.preventDefault()

    // Check for errors
    if (isEmpty(formData.euSymbol)) {
      setErrorMessage("European symbol cannot be empty")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.gerSymbol)) {
      setErrorMessage("German symbol cannot be empty")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.density)) {
      setErrorMessage("Density cannot be empty")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    // if (isNumber(Number(formData.density))) {
    //   setErrorMessage("Please enter number in Density field")
    //   setIsError(true);
    //   return
    // } else {
    //   setIsError(false)
    // }

    console.log(formData);

    //if there are no errors call requested method function
    if (props.type === "add") {
      console.log(addMaterialGrade(formData))
      // addMaterialGrade(formData);
      props.closeModal();
      props.refreshPage();
    }
    if (props.type === "edit") {
      editMaterialGrade({
        materialGradeId: props.obj.materialGradeId,  
        ...formData        
      });
      props.closeModal();
      props.refreshPage();
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
        <input
          type="number"
          placeholder="Density"
          name="density"
          onChange={handleChange} 
          value={formData.density}
        />
        <select 
          value={formData.gradeGroup}
          onChange={handleChange}
          name="gradeGroup"
        >
          {materialGroupsArr}
        </select>
      <button>Submit</button>
      </form>
    </div>
  )
}
