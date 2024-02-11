import React, { useEffect, useState } from 'react'
// custom hooks imports
import useModal from '../../../customHooks/useModal';
import useDictionariesApi from '../../../customHooks/useDictionariesApi';
//utils imports
import { isEmpty, capitalFirstLetter } from '../../../utils/utils';

export default function MaterialGradeEditForm(props) {

  const {materialGradeId, euSymbol, gerSymbol, gradeGroup} = props.obj;
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState(
    {
      euSymbol: euSymbol,
      gerSymbol: gerSymbol,
      gradeGroup: gradeGroup === "" ? "steel" : gradeGroup
    }
  )

  console.log(formData)

  const {
    addMaterialGrade,
    getMaterialGroupTypes,
    editMaterialGrade,
    materialGroupTypes
  } = useDictionariesApi();

  function handleSubmit(e) {
    e.preventDefault()
    if (isEmpty(formData.euSymbol)) {
      setErrorMessage("cannot be empty")
    }
    if (props.type === "add") {
      addMaterialGrade(formData);
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
