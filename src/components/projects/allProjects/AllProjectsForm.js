import React, { useContext, useEffect, useState } from 'react'
// custom hooks imports
import useApi from '../../../customHooks/useApi';
//components imports
import CtaButton from '../../buttons/CtaButton';
import FormError from '../../form/FormError';
//contexts imports
import { ModalContext } from '../../../App';
// utils imports
import { isEmpty, isNumber, isEqualZero, capitalFirstLetter } from '../../../utils/utils';


export default function AllProjectsForm(props) {

  // utilize ModalContext
  const {isModalOn, toggleModalOn, toggleModalOff} = useContext(ModalContext);

  // state variables
  const {projectNumber, projectClientNumber, title, projectType} = props.obj
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);


  const [formData, setFormData] = useState(
    {
      projectNumber: projectNumber,
      projectClientNumber: projectClientNumber,
      title: title,
      projectType: projectType ? projectType.typeName : "",
    }
  )

  // utilize useApi custom hook
  const {
    getData,
    fetchedData
  } = useApi();

  // fetching data
  useEffect(() => {
    async function getProjectTypesData() {
      getData("../data/projectTypes")
    }
    getProjectTypesData()
  }, [])

  // set new state of project types when fetched data change
  useEffect(() => {
    setProjectTypes(fetchedData)
  }, [fetchedData])

  // fetch settings data
  useEffect(() => {

  })


  // if data is fetched
  const projectTypesArr = fetchedData && projectTypes.map(item => {
    const {typeId, typeName} = item
    return (
      <option 
        key={typeId}
        value={typeName}
      >
        {capitalFirstLetter(typeName)}
      </option>
    )
  })

  function handleSubmit(e) {
    e.preventDefault()
    console.log("handling submit")
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
      {/* {fetchError && <FormError errorMessage={fetchError.message} />} */}
      <form className='form--3xfr'>
        <div className='input-label__container'>
          <label htmlFor='projectNumber'>
            Project number
          </label>
          <input
            type="text"
            placeholder="Project number"
            name="euSymprojectNumberbol"
            id="projectNumber"
            onChange={handleChange} 
            value={formData.projectNumber}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='projectClientNumber'>
            Project client number:
          </label>
          <input
            type="text"
            placeholder="Project client number"
            name="projectClientNumber"
            id="projectClientNumber"
            onChange={handleChange} 
            value={formData.projectClientNumber}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='projectType' >
            Material group:
          </label>
          <select
            value={formData.projectType}
            onChange={handleChange}
            name="projectType"
            id="projectType"
          >
            {projectTypesArr}
          </select>
        </div>

        <div className='input-label__container'>
          <label htmlFor='projectTitle'>
            Project title:
          </label>
          <input
            type="text"
            placeholder="Project title"
            name="title"
            id="projectTitle"
            onChange={handleChange} 
            value={formData.title}
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
