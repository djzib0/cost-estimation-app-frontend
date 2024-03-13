import React, { useContext, useState } from 'react';
//components imports
import CtaButton from '../buttons/CtaButton';
import PlateMaterialRemarkModal from './PlateMaterialRemarkModal';
//context imports
import { DefaultSettingsContext } from '../../App';
import { ModalContext } from '../../App';
//icons imports
import { MdOutlineRectangle } from "react-icons/md";
import { MdOutlineCircle } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import { hover } from '@testing-library/user-event/dist/hover';
//styles imports
import "./PlateMaterialItem.css"

export default function PlateMaterialitem(props, position) {

  // utlizie Theme Context 
  const {theme} = useContext(DefaultSettingsContext);
  const themeMode = `--${theme}`

  //utilize Modal Context 
  const {
    isModalOn,
    toggleModalOn,
    toggleModalOff
  } = useContext(ModalContext);

  
  const {
    dimensionA,
    dimensionB,
    isPainted,
    isPaintedBothSides,
    materialGrade,
    surfaceToConserve,
    thickness,
    weight,
    quantity,
    totalWeight,
    isRing,
    remark
  } = props.item;

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
        <div className='cell__container--narrower'>{dimensionA}</div>
        <div className='cell__container--narrower'>{dimensionB}</div>
        <div className='cell__container--narrower'>{thickness}</div>
        <div className='cell__container--narrower'>{weight}</div>
        <div className='cell__container--narrower'>{quantity}</div>
        <div className='cell__container--narrower'>{totalWeight}</div>
        <div className='cell__container--narrower'>{materialGrade}</div>
        <div className='cell__container--narrower'>{isPainted ? "Yes" : "No"}</div>
        <div className='cell__container--narrower'>{isPaintedBothSides ? "Yes" : "No"}</div>
        <div className='cell__container--narrower'>{surfaceToConserve}</div>
        <div className='cell__container--narrower'>{isRing ? <MdOutlineCircle /> : <MdOutlineRectangle />}</div>
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
          {isRemarkModalOn && <PlateMaterialRemarkModal remark={remark} />}
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
