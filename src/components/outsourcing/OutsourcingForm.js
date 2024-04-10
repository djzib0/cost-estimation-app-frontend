import React, { useEffect, useState } from 'react'
// components imports
import FormError from '../form/FormError';
import CtaButton from '../buttons/CtaButton';
// custom hooks imports
import useApi from '../../customHooks/useApi';
// icons imports
import { GoTrash } from "react-icons/go";
import { CiUndo } from "react-icons/ci";
// utils imports
import { isEmpty, isNumber, isEqualZero, capitalFirstLetter } from '../../utils/utils';


export default function OutsourcingForm(props) {

  const {
    outsourcingId,
    outsourcingName,
    contractorName,
    outsourcingValue,
    remark,
    projectId,
  } = props.obj

   // state variables
   const [errorMessage, setErrorMessage] = useState("");
   const [isError, setIsError] = useState(false);
   const [remarkClipBoard, setRemarkClipBoard] = useState("");
   const [formData, setFormData] = useState(
    {
      outsourcingName: outsourcingName ? outsourcingName : "",
      contractorName: contractorName ? contractorName : "",
      outsourcingValue: outsourcingValue ? outsourcingValue : "",
      remark: remark ? remark : "",
      // below are required to be a correct json body, but are not
      // editable by user
      projectId: projectId,
      outsourcingId: outsourcingId
    }
  );

  // utilize useApi custom hook
  const {
    getData,
    addData,
    editData,
    fetchedData,
    fetchError,
  } = useApi();

  function handleChange(e) {
    const {name, value, type, checked} = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Check for errors
    if (isEmpty(formData.outsourcingName)) {
      setErrorMessage("Name cannot be empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.contractorName)) {
      setErrorMessage("Contractor name cannot be empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.outsourcingValue) || isEqualZero(formData.outsourcingValue)) {
      setErrorMessage("Price cannot be 0 or empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }
    

    if (props.type === "add") {
      addData(
        `../../../data/outsourcing/add`,
        formData,
        "Failed to add new material");
    }

    if (props.type === "edit") {
      console.log(formData.projectId)
      editData(
        `../../../data/outsourcing/edit`,
        formData,
        "Failed to edit material");
    }

    props.refreshPage();
    return
  }

  function resetRemark() {
    // copy remark text and save it in "clipboard" state
    setRemarkClipBoard(formData.remark);
    setFormData(prevData => {
      return {
        ...prevData,
        remark: ""
      }
    });
  }

  function undoRemark() {
    // undo remark from "clipboard" state
    setFormData(prevData => {
      return {
        ...prevData,
        remark: remarkClipBoard
      }
    });
    setRemarkClipBoard("");
  }

  return (
    <div>
      {isError && <FormError errorMessage={errorMessage} />}
      {fetchError && <FormError errorMessage={fetchError.message} />}
      <form className='form--3xfr'>

        <div className='input-label__container--row--3-3'>
          <label htmlFor='outsourcingName'> 
            Name:
          </label>
          <input
            type="text"
            placeholder={"Name"}
            name="outsourcingName"
            id="outsourcingName"
            onChange={handleChange} 
            value={formData.outsourcingName}
          />
        </div>

        <div className='input-label__container--row--2-3'>
          <label htmlFor='contractorName'>
            Contractor:
          </label>
          <input
            type="text"
            placeholder="Contractor name"
            name="contractorName"
            id="contractorName"
            onChange={handleChange} 
            value={formData.contractorName}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='outsourcingValue'>
            Price [PLN]:
          </label>
          <input
            type="number"
            placeholder="Price"
            name="outsourcingValue"
            id="outsourcingValue"
            onChange={handleChange} 
            value={formData.outsourcingValue}
          />
        </div>

        <div className='input-label__container--row--3-3'>
          <label htmlFor='remark' className='textarea__label'>
            Remark
          </label>
          <div className='textarea-input__field'>
            <textarea
              placeholder="Remark"
              name="remark"
              id="remark"
              onChange={handleChange} 
              value={formData.remark}
              maxLength={500}              
            />
            <div className='chars-counter__container'>
              <p className={formData.remark.length >= 500 ? 'chars-counter--red' : 'chars-counter'}>
                {formData.remark.length}/500
              </p>
              {formData.remark.length > 0
              ? 
                <div 
                className='remark-icon__container'
                onClick={resetRemark}>
                  <GoTrash />
              </div>
              :
              <div 
              className='remark-icon__container'
              onClick={undoRemark}>
                <CiUndo />
              </div>
              }
            </div>
          </div>
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
