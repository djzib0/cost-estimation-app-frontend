import React, { useContext, useState } from 'react'
// custom hooks imports
import useApi from '../../../customHooks/useApi';
//components imports
import CtaButton from '../../buttons/CtaButton';
import FormError from '../../form/FormError';
//contexts imports
import { ModalContext } from '../../../App';

export default function AllProjectsForm(props) {

  // utilize ModalContext
  const {isModalOn, toggleModalOn, toggleModalOff} = useContext(ModalContext);

  const {projectNumber, projectClientNumber, title} = props.obj
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [formData, setFormData] = useState(
    {
      projectNumber: projectNumber,
      projectClientNumber: projectClientNumber,
      title: title,
    }
  )

  console.log(props.obj, "props item")

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
          <label htmlFor='projectClientNumber' className='label--small'>
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
          <label htmlFor='projectClientNumber' className='label--small'>
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
          <label htmlFor='title'>
            Title:
          </label>
          <textarea 
            name="title"
            id="title"
            placeholder="Title"
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
