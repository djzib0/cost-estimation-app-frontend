import React, { useContext } from 'react';
//components imports
import CtaButton from '../buttons/CtaButton';
//context imports
import { DefaultSettingsContext } from '../../App';
import { ModalContext } from '../../App';
//styles imports

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
    totalWeight
  } = props.item;

  return (
    <div className={`row__container${themeMode}`}>
        <div className='cell__container--narrow'>{props.position}</div>
        <div className='cell__container--narrow'>{dimensionA}</div>
        <div className='cell__container--narrow'>{dimensionB}</div>
        <div className='cell__container--narrow'>{thickness}</div>
        <div className='cell__container--narrow'>{weight}</div>
        <div className='cell__container--narrow'>{quantity}</div>
        <div className='cell__container--narrow'>{totalWeight}</div>
        <div className='cell__container--narrow'>{materialGrade.euSymbol}</div>
        <div className='cell__container--narrow'>{isPainted ? "Yes" : "No"}</div>
        <div className='cell__container--narrow'>{isPaintedBothSides ? "Yes" : "No"}</div>
        <div className='cell__container--narrow'>{surfaceToConserve}</div>
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
