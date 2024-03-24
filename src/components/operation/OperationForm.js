import React, { useState, useEffect } from 'react'
// components imports
import FormError from '../form/FormError';
import CtaButton from '../buttons/CtaButton';
// custom hooks imports
import useApi from '../../customHooks/useApi';
// params import
import { useParams } from 'react-router-dom';
// icons imports
import { GoTrash } from "react-icons/go";
import { CiUndo } from "react-icons/ci";
// utils imports
import { isEmpty, isNumber, isEqualZero, capitalFirstLetter } from '../../utils/utils';


export default function OperationForm(props) {

  const {
    operationTitle,
    quantity,
    remark,
    operationHourTypeName,
    operationHourTypeId,
    projectOperationId
  } = props.obj;

  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [operationTypes, setOperationTypesData] = useState([]);
  const [remarkClipBoard, setRemarkClipBoard] = useState("");

  const [formData, setFormData] = useState(
    {
      operationTitle: operationTitle ? operationTitle: "",
      quantity: quantity ? quantity : "",
      remark: remark ? remark: "",
      operationHourTypeName: operationHourTypeName ? operationHourTypeName : 0,
      operationHourTypeId: operationHourTypeId ? operationHourTypeId: 0,
      // below are required to be a correct json body, but are not
      // editable by user
      projectOperationId: projectOperationId ? projectOperationId: 0,
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

  // utilize params
  const params = useParams()

  // fetch operation types
  useEffect(() => {
    getData(`../../../data/hourtypes/all`)
  }, [])

  useEffect(() => {
    setOperationTypesData(prevData => fetchedData)
    if (fetchedData) {
      // iterate throuhg operation types
      for (let item of operationTypes) {
        // while editing operation it's operation type is in
        // array of fetched operation types, form sets the
        // value as a default one. If the user delete material
        // from dictionary (database) and the operation will be
        // edited, it won't find it in array, then the values
        // will be set to the default one.

        if (item.productionHourTypeName === operationHourTypeName) {
          setFormData(prevData => {
            return {
              ...prevData,
              operationHourTypeName: item.productionHourTypeName,
              operationHourTypeId: item.productionHourTypeId
            }
          })
        }
      }
    }
  }, [fetchedData])

  function handleChange(e) {
    const {name, value, type, checked} = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }
    })
  }


  // create list of operation types to display them in form
  const operationTypesArr = operationTypes && operationTypes.map(item => {
    const {productionHourTypeId, productionHourTypeName} = item;
    return (
      <option 
        key={productionHourTypeId}
        value={Number(productionHourTypeId)}
      >
        {capitalFirstLetter(productionHourTypeName)}
      </option>
    )
  });

  function handleSubmit(e) {
    e.preventDefault()
    // Check for errors
    if (isEmpty(formData.operationTitle)) {
      setErrorMessage("Operation title cannot be empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.quantity) || isEqualZero(formData.quantity)) {
      setErrorMessage("Quantity cannot be 0 or empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (Number(formData.operationHourTypeId) === 0) {
      setErrorMessage("Please choose operation type.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (props.type === "add") {
      addData(
        `../../../data/operations/add?projectId=${Number(params.id)}`,
        formData,
        "Failed to add new operation.");
    }

    if (props.type === "edit") {
      editData(
        `../../../data/operations/edit?projectId=${Number(params.id)}`,
        formData,
        "Failed to edit an operation.");
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
      <form className='form--2xfr'>

        <div className='input-label__container--row--3-3'>
          <label htmlFor='operationTitle'>
          Operation title
          </label>
          <input
            type="text"
            placeholder="Operation title"
            name="operationTitle"
            id="operationTitle"
            onChange={handleChange} 
            value={formData.operationTitle}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='quantity'>
            Quantity [hrs]
          </label>
          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            id="quantity"
            onChange={handleChange} 
            value={formData.quantity}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='operationHourTypeName' >
            Operation type:
          </label>
          <select
            value={formData.operationHourTypeId}
            onChange={handleChange}
            name="operationHourTypeId"
            id="operationHourTypeId"
          >
            <option 
              value={0}
            >
            ------
            </option>
            {operationTypesArr}
          </select>
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
