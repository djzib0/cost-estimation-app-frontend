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


export default function OtherMaterialForm(props) {

  const {
    otherMaterialId,
    otherMaterialName,
    quantity,
    unitName,
    pricePerUnit,
    totalValue,
    remark,
    projectId,
  } = props.obj

  // state variables
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [unitsData, setUnitsData] = useState([]);
  const [remarkClipBoard, setRemarkClipBoard] = useState("");
  const [formData, setFormData] = useState(
    {
      otherMaterialName: otherMaterialName ? otherMaterialName : "",
      quantity: quantity ? quantity : "",
      unitName: unitName ? unitName: "",
      pricePerUnit: pricePerUnit ? pricePerUnit : "",
      totalValue: totalValue ? totalValue : "",
      remark: remark ? remark : "",
      // below are required to be a correct json body, but are not
      // editable by user
      projectId: projectId,
      otherMaterialId: otherMaterialId,
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

  // fetch units
  useEffect(() => {
    getData("../../../data/units")
  }, [])

  useEffect(() => {
    setUnitsData(prevData => fetchedData)
    if (fetchedData) {
      // iterate through units
      for (let unit of unitsData) {
        // if edited item unit is in array of units,
        // form get that value and set it while rendered.
        // If the user delete unit from dictionary it won't be 
        // found, so it has to be set to the default one
        if (unit.unitName === unitName) {
          setFormData(prevData => {
            return {
              ...prevData,
              unitName: unit.unitName
            }
          })
        }
      }
    }
  }, [fetchedData])

  // create list of options to display them in form
  const unitsArr = unitsData && unitsData.map(item => {
    const {unitId, unitName} = item;
    return (
      <option
        key={unitId}
        value={unitName}
      >
        {unitName}
      </option>
    )
  })

  function handleChange(e) {
    const {name, value, type, checked} = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }
    })
  }

  console.log(formData.unitName, " unit id")

  function handleSubmit(e) {
    e.preventDefault();
    // Check for errors
    if (isEmpty(formData.otherMaterialName)) {
      setErrorMessage("Name cannot be empty.")
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

    if (isEmpty(formData.pricePerUnit) || isEqualZero(formData.price)) {
      setErrorMessage("Price cannot be 0 or empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (Number(formData.unitId) === 0) {
      setErrorMessage("Please choose the unit.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (props.type === "add") {
      addData(
        `../../../data/materials/othermaterials/add`,
        formData,
        "Failed to add new material");
    }

    if (props.type === "edit") {
      console.log(formData.projectId)
      editData(
        `../../../data/materials/othermaterials/edit`,
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
      <form className='form--2xfr'>

        <div className='input-label__container--row--3-3'>
          <label htmlFor='otherMaterialName'> 
            Name:
          </label>
          <input
            type="text"
            placeholder={"Name"}
            name="otherMaterialName"
            id="otherMaterialName"
            onChange={handleChange} 
            value={formData.otherMaterialName}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='quantity'>
            Quantity
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
          <label htmlFor='unitName' >
            Unit:
          </label>
          <select
            value={formData.unitName}
            onChange={handleChange}
            name="unitName"
            id="unitName"
          >
            <option 
              value={0}
            >
            ------
            </option>
            {unitsArr}
          </select>
        </div>

        <div className='input-label__container'>
          <label htmlFor='pricePerUnit'>
            Price per unit [PLN]
          </label>
          <input
            type="number"
            placeholder="Price per unit"
            name="pricePerUnit"
            id="pricePerUnit"
            onChange={handleChange} 
            value={formData.pricePerUnit}
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
