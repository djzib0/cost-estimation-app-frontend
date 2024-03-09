import React, { useEffect, useState } from 'react'
// components imports
import FormError from '../form/FormError';
import CtaButton from '../buttons/CtaButton';
// custom hooks imports
import useApi from '../../customHooks/useApi';
// images import
import rectTestImage from '../../images/rectTestImage.png'
import ringTestImage from '../../images/ringTestImage.png'
// utils imports
import { isEmpty, isNumber, isEqualZero, capitalFirstLetter } from '../../utils/utils';

export default function PlateMaterialForm(props) {

  
  const {
    plateMaterialId,dimensionA, dimensionB, isPainted,
    isPaintedBothSides, isRing, pricePerKg,
    quantity, thickness } = props.obj;

  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [materialGrades, setMaterialGrades] = useState();

  const [formData, setFormData] = useState(
    {
      dimensionA: dimensionA,
      dimensionB: dimensionB,
      thickness: thickness,
      isRing: isRing,
      isPainted: isPainted,
      isPaintedBothSides: isPaintedBothSides,
      pricePerKg: pricePerKg,
      quantity: quantity,
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

  // fetch material grades
  useEffect(() => {
    getData("../../data/allmaterialgrades")
    console.log(fetchedData, " after fetching")
  }, [])

  useEffect(() => {
    setMaterialGrades(prevData => fetchedData)
  }, [fetchedData])

  // create list of options to display them in form
  const materialGradesArr = materialGrades && materialGrades.map(item => {
    console.log(item, " item")
    const {materialGradeId, euSymbol } = item;
    return (
      <option 
        key={materialGradeId}
        value={euSymbol}
      >
        {euSymbol}
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

  function handleSubmit(e) {
    e.preventDefault()
    // Check for errors
    if (isEmpty(formData.dimensionA)) {
      setErrorMessage(
        formData.isRing ?
        "Outer diameter cannot be empty":
        "Dimension A cannot be empty")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.dimensionB)) {
      setErrorMessage(
        formData.isRing ?
        "Inner diameter cannot be empty":
        "Dimension B cannot be empty")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }


    if (formData.isRing && formData.dimensionB > formData.dimensionA) {
      setErrorMessage("Inner diameter cannot be bigger than outer diameter")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }
  }

  return (
    <div>
      {isError && <FormError errorMessage={errorMessage} />}
      {fetchError && <FormError errorMessage={fetchError.message} />}
      <form className='form--3xfr'>

      <div className='input-label__container'>
          <label htmlFor='isRing'>
            Ring
          </label>
          <input
            type="checkbox"
            name="isRing"
            id="isRing"
            onChange={handleChange} 
            value={formData.isRing}
          />
        </div>
        <div className='span--2c3r'>
          {!formData.isRing ?
           <img src={rectTestImage} className='form__image'/>:
           <img src={ringTestImage} className='form__image'/>
           }
        </div>

        <div className='input-label__container'>
          <label htmlFor='isPainted'>
            Painted
          </label>
          <input
            type="checkbox"
            name="isPainted"
            id="isPainted"
            onChange={handleChange} 
            value={formData.isPainted}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='isPaintedBothSides'>
            Painted both sides
          </label>
          <input
            type="checkbox"
            name="isPaintedBothSides"
            id="isPaintedBothSides"
            onChange={handleChange} 
            value={formData.isPaintedBothSides}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='dimensionA'>
            {formData.isRing ? 
            "Out. diameter [mm]" :
            "Dimension A [mm]"}
          </label>
          <input
            type="text"
            placeholder={
              formData.isRing ?
              "Outer diameter":
              "Dimension A"}
            name="dimensionA"
            id="dimensionA"
            onChange={handleChange} 
            value={formData.dimensionA}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='dimensionB'>
          {formData.isRing ? 
            "Inn. diameter [mm]" :
            "Dimension B [mm]"}
          </label>
          <input
            type="text"
            placeholder={
              formData.isRing ?
              "Inner diameter":
              "Dimension B"}
            name="dimensionB"
            id="dimensionB"
            onChange={handleChange} 
            value={formData.dimensionB}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='thickness'>
            Thickness [mm]
          </label>
          <input
            type="number"
            placeholder="Thickness"
            name="thickness"
            id="thickness"
            onChange={handleChange} 
            value={formData.thickness}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='pricePerKg'>
            Price per kg [PLN]
          </label>
          <input
            type="number"
            placeholder="Price per kg"
            name="pricePerKg"
            id="thicknpricePerKgess"
            onChange={handleChange} 
            value={formData.pricePerKg}
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
          <label htmlFor='materialGrade' >
            Material grade:
          </label>
          <select
            value={formData.materialGrade}
            onChange={handleChange}
            name="materialGrade"
            id="materialGrade"
          >
            {materialGradesArr}
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
