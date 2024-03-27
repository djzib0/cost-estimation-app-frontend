import React, { useContext, useState } from 'react';
// components imports
import RemarkModal from '../remarkModal/RemarkModal';
import CtaButton from '../buttons/CtaButton';
import Remark from '../remark/Remark';
// utils imports
import { capitalFirstLetter } from '../../utils/utils'
//icons imports
import { SlNote } from "react-icons/sl";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
// context imports
import { DefaultSettingsContext } from '../../App';

export default function OperationItem(props) {

  // utilize Theme Context 
  const {theme} = useContext(DefaultSettingsContext);
  const themeMode = `--${theme}`

  const {
    operationTitle,
    quantity,
    operationPricePerHour,
    totalValue,
    operationHourTypeName,
    remark,
  } = props.item;

  // console.log(props.previousItemPosition, "prev")
  // console.log(props.nextItemPosition, " next")
  // console.log(props.operationsArrLength, " length")

  function moveUp() {
    console.log("moving up")
    props.refreshPage();
  }


  return (
    <div className={`row__container${themeMode}`}>
        <div className='cell__container--narrower'>{props.position}</div>
        <div className='cell__container--wide'>{operationTitle}</div>
        <div className='cell__container--narrower'>{quantity}</div>
        <div className='cell__container--narrower'>{operationPricePerHour}</div>
        <div className='cell__container--narrower'>{totalValue}</div>
        <div className='cell__container--narrower'>{operationHourTypeName && capitalFirstLetter(operationHourTypeName)}</div>
        <div className='cell__container--wide'>
          <Remark text={remark} />
        </div>
        <div>
          {props.previousItemPosition != 0 && <FaArrowUp onClick={() => moveUp()} />}
          {props.nextItemPosition <= props.operationsArrLength && <FaArrowDown />}

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
