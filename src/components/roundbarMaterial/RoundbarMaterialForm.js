import React, { useState, useEffect } from 'react'
// components imports
import FormError from '../form/FormError';
import CtaButton from '../buttons/CtaButton';
// custom hooks imports
import useApi from '../../customHooks/useApi';
// utils imports
import { isEmpty, isEqualZero } from '../../utils/utils';
// icons imports
import { GoTrash } from "react-icons/go";
import { CiUndo } from "react-icons/ci";
// images imports
import roundbarTestImage from '../../images/roundbarTestImage.jpg'

export default function RoundbarMaterialForm(props) {

  const {
    roundbarMaterialId, diameter, profileLength, quantity,
    isPainted, projectId, pricePerKg, materialGrade, remark,
    density
  } = props.obj

  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [materialGrades, setMaterialGrades] = useState([]);
  const [remarkClipBoard, setRemarkClipBoard] = useState();

  const [formData, setFormData] = useState(
    {
      roundbarMaterialId: roundbarMaterialId,
      diameter: diameter ? diameter : "",
      profileLength: profileLength ? profileLength : "",
      quantity: quantity ? quantity : "",
      remark: remark ? remark : "",
      materialGrade: materialGrade ? materialGrade: "",
      isPainted: isPainted ? isPainted : false,
      pricePerKg:  pricePerKg ? pricePerKg : "",
      remark: remark ? remark: "",
      // below are required to be a correct json body, but are not
      // editable by user
      projectId: projectId,
      density: density ? density : 0,
      materialGradeId: 0,
    }
  )

  // utilize useApi custom hook
  const {
    getData,
    addData,
    editData,
    fetchedData,
    fetchError
  } = useApi()

   // fetch material grades
   useEffect(() => {
    getData("../../../data/allmaterialgrades")
  }, [])

  useEffect(() => {
    setMaterialGrades(prevData => fetchedData)
    if (fetchedData) {
      // iterate through material grades
      for (let item of materialGrades) {
        // if edited plate material grade is in array of material grades, 
        // form get that values and set it while rendered.
        // If the user delete material grade from dictionary
        // and the plate will be edited, it won't find it in array,
        // and then the values will be set to the default one
        if (item.euSymbol === materialGrade) {
          setFormData(prevData => {
            return {
              ...prevData,
              materialGradeId: item.materialGradeId,
              materialGrade: item.euSymbol,
              density: item.density,
            }
          })
        }
      }
    }
  }, [fetchedData])

  // create list of options to display them in form
  const materialGradesArr = materialGrades && materialGrades.map(item => {
    const {materialGradeId, euSymbol } = item;
    return (
      <option 
        key={materialGradeId}
        value={Number(materialGradeId)}
      >
        {euSymbol}
      </option>
    )
  })


  // functions
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
    //Check for errors
    if (isEmpty(formData.diameter) || isEqualZero(formData.diameter)) {
      setErrorMessage("Diameter cannot be 0 or empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.profileLength) || isEqualZero(formData.profileLength)) {
      setErrorMessage("Length cannot be 0 or empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.pricePerKg) || isEqualZero(formData.pricePerKg)) {
      setErrorMessage("Price per kg cannot be 0 or empty.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (isEmpty(formData.quantity) || isEqualZero(formData.quantity)) {
      setErrorMessage("Quantity must be at least 1.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (Number(formData.materialGradeId) === 0) {
      setErrorMessage("Please choose the material grade.")
      setIsError(true);
      return
    } else {
      setIsError(false)
    }

    if (props.type === "add") {
      addData(
        `../../../data/materials/roundbar/add?materialGradeId=${Number(formData.materialGradeId)}`,
        formData,
        "Failed to add new plate");
    }

    if (props.type === "edit") {
      editData(
        `../../../data/materials/roundbar/edit?materialGradeId=${Number(formData.materialGradeId)}`,
        formData,
        "Failed to edit new plate.");
    }

    props.refreshPage();
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

        <div className='span--3c1r'>
          <img src={roundbarTestImage} className='form__image'/>
        </div>

        <div className='input-label__container'>
          <label htmlFor='diameter'>
            Diameter [mm]
          </label>
          <input
            type="number"
            placeholder="Diameter"
            name="diameter"
            id="diameter"
            onChange={handleChange} 
            value={formData.diameter}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='profileLength'>
            Length [mm]
          </label>
          <input
            type="number"
            placeholder="Length"
            name="profileLength"
            id="profileLength"
            onChange={handleChange} 
            value={formData.profileLength}
          />
        </div>

        <div className='input-label__container'>
          <label htmlFor='materialGradeId' >
            Material grade:
          </label>
          <select
            value={formData.materialGradeId}
            onChange={handleChange}
            name="materialGradeId"
            id="materialGradeId"
          >
            <option 
              value={0}
            >
            ------
            </option>
            {materialGradesArr}
          </select>
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
          <label htmlFor='isPainted'>
            Painted?
          </label>
          <input
            type="checkbox"
            name="isPainted"
            id="isPainted"
            onChange={handleChange} 
            value={formData.isPainted}
            checked={formData.isPainted}
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
