import React, { useContext, useState } from 'react'
// components imports
import RemarkModal from '../remarkModal/RemarkModal';
import CtaButton from '../buttons/CtaButton';
//icons imports
import { SlNote } from "react-icons/sl";
// context imports
import { DefaultSettingsContext } from '../../App';

export default function RoundbarMaterialItem(props) {

   // utilize Theme Context 
   const {theme} = useContext(DefaultSettingsContext);
   const themeMode = `--${theme}`

  const {
    remark,
    diameter,
    profileLength,
    weight,
    totalWeight,
    weightPerMeter,
    quantity,
    materialGrade,
    isPainted,
    surfaceToConserve,
  } = props.item

  // state variables 
  const [isRemarkModalOn, setIsRemarkModalOn] = useState(false)


  function toggleRemarkModal() {
    setIsRemarkModalOn(prevState => {
      return prevState === true ? false : true;
    })
  }

  return (
    <div className={`row__container${themeMode}`}>
        <div className='cell__container--narrower'>{props.position}</div>
        <div className='cell__container--narrower'>{diameter}</div>
        <div className='cell__container--narrower'>{profileLength}</div>
        <div className='cell__container--narrower'>{weight}</div>
        <div className='cell__container--narrower'>{weightPerMeter}</div>
        <div className='cell__container--narrower'>{quantity}</div>
        <div className='cell__container--narrower'>{totalWeight}</div>
        <div className='cell__container--narrower'>{materialGrade}</div>
        <div className='cell__container--narrower'>{isPainted ? "Yes" : "No"}</div>
        <div className='cell__container--narrower'>{surfaceToConserve}</div>
        <div 
        className='cell__container--narrower'
        >
          {remark &&  
          <p 
            className='remark__icon'
            onMouseEnter={toggleRemarkModal}
            onMouseLeave={toggleRemarkModal}>
              <SlNote />
          </p>}
          {isRemarkModalOn && <RemarkModal remark={remark} />}
        </div>
        <div className='cell-cta__container'>
          <CtaButton 
                  title="edit"
                  type="edit"
                  variant="medium"
                  handlingFunction={() => props.editItem(props.item)}
          /> 
          <CtaButton 
                  title="delete"
                  type="delete"
                  variant="medium"
                  handlingFunction={() => props.deleteItem(props.item)}
          />
        </div>
    </div>
  )
}
