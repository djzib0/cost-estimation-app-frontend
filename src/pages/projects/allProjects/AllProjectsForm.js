import React, { useContext, useEffect, useState } from 'react'
// custom hooks imports
import useApi from '../../../customHooks/useApi';
import useModal from '../../../customHooks/useModal';
//components imports
import CtaButton from '../../../components/buttons/CtaButton';
import FormError from '../../../components/form/FormError';
//contexts imports
import { ModalContext } from '../../../App';
import { DefaultSettingsContext } from '../../../App';
// utils imports
import { isEmpty, isNumber, isEqualZero, capitalFirstLetter } from '../../../utils/utils';


export default function AllProjectsForm(props) {

  // utilize contexts
  const {isModalOn, toggleModalOn, toggleModalOff} = useContext(ModalContext);
  const {settings} = useContext(DefaultSettingsContext);

  // state variables
  const {
    projectNumber,
    projectClientNumber,
    title,
    projectType,
    drawingNumber,
    materialMargin,
    outsourcingMargin,
    salesMargin,
  } = props.obj

  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);


  const [formData, setFormData] = useState(
    {
      projectNumber: projectNumber,
      projectClientNumber: projectClientNumber,
      title: title,
      projectType: props.obj.projectType.typeId ? props.obj.projectType.typeId : "1",
      drawingNumber: drawingNumber ? drawingNumber : "",
      materialMargin: settings.defaultMaterialMargin,
      outsourcingMargin: settings.defaultOutsourcingMargin,
      salesMargin: settings.defaultSalesMargin,
    }
  )

  // utilize useApi custom hook
  const {
    getData,
    addData,
    editData,
    fetchedData,
    fetchError,
  } = useApi();

  console.log(props.obj.projectType.typeId, " props id")


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


  // if data is fetched
  const projectTypesArr = fetchedData && projectTypes.map(item => {
    const {typeId, typeName} = item
    return (
      <option 
        key={typeId}
        value={typeId}
      >
        {capitalFirstLetter(typeName)}
      </option>
    )
  })

  function handleSubmit(e) {
    e.preventDefault()
    // check for errors
    if (isEmpty(formData.projectNumber)) {
      setErrorMessage("Project number cannot be empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.projectClientNumber)) {
      setErrorMessage("Project client number cannot be empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.title)) {
      setErrorMessage("Project title cannot be empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.materialMargin)) {
      setErrorMessage(
        "Material margin cannot be empty. Please enter \"0\" if there is no extra margin.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.outsourcingMargin)) {
      setErrorMessage(
        "Outsourcing margin cannot be empty. Please enter \"0\" if there is no extra margin.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.salesMargin)) {
      setErrorMessage(
        "Sales margin cannot be empty. Please enter \"0\" if there is no extra margin.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    //if there are no input errors call requested method function
    if (props.type === "add") {
      console.log(formData.projectType, "number of project type")
      addData(`/data/projects/add?projectTypeId=${formData.projectType}`, 
      {
        projectNumber: formData.projectNumber,
        projectClientNumber: formData.projectClientNumber,
        title: formData.title,
        drawingNumber: formData.drawingNumber,
        materialMargin: formData.materialMargin,
        outsourcingMargin: formData.outsourcingMargin,
        salesMargin: formData.salesMargin
      });
      props.refreshPage();
      return
    }

    if (props.type === "edit") {
      editData(`/data/projects/edit?projectTypeId=${formData.projectType}`, 
      {
        projectId: props.obj.projectId,
        projectNumber: formData.projectNumber,
        projectClientNumber: formData.projectClientNumber,
        title: formData.title,
        drawingNumber: formData.drawingNumber,
        materialMargin: formData.materialMargin,
        outsourcingMargin: formData.outsourcingMargin,
        salesMargin: formData.salesMargin
      });
      props.refreshPage();
      return
    }
  }


  function handleChange(e) {
    const {name, value, type, checked} = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }
    })
    console.log(formData.projectType, " formdata after change")
  }

  return (
    <div>
      {isError && <FormError errorMessage={errorMessage} />}
      {fetchError && <FormError errorMessage={fetchError.message} />}
      <form className='form--3xfr'>

        <div className='input-label__container'>
          <label htmlFor='projectNumber'>
            Project number
          </label>
          <input
            type="text"
            placeholder="Project number"
            name="projectNumber"
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
            Project type:
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

        <div className='input-label__container--row--2-3'>
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

        <div className='input-label__container'>
          <label htmlFor='drawingNumber'>
            Drawing number
          </label>
          <input
            type="text"
            placeholder="Drawing number"
            name="drawingNumber"
            id="drawingNumber"
            onChange={handleChange} 
            value={formData.drawingNumber}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='materialMargin'>
           Material margin [%]
          </label>
          <input
            type="number"
            placeholder="Material margin"
            name="materialMargin"
            id="materialMargin"
            onChange={handleChange} 
            value={formData.materialMargin}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='outsourcingMargin'>
            Outsource margin [%]
          </label>
          <input
            type="number"
            placeholder="Outsourcing margin"
            name="outsourcingMargin"
            id="outsourcingMargin"
            onChange={handleChange} 
            value={formData.outsourcingMargin}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='salesMargin'>
            Sales margin [%]
          </label>
          <input
            type="number"
            placeholder="Sales margin"
            name="salesMargin"
            id="salesMargin"
            onChange={handleChange} 
            value={formData.salesMargin}
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
