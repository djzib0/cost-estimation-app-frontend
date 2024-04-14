import React, { useContext, useState } from 'react';
// components imports
import RemarkModal from '../remarkModal/RemarkModal';
import CtaButton from '../buttons/CtaButton';
import Remark from '../remark/Remark';
// custom hooks imports
import useApi from '../../customHooks/useApi';
// utils imports
import { capitalFirstLetter } from '../../utils/utils'
//icons imports
import { SlNote } from "react-icons/sl";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
// context imports
import { DefaultSettingsContext } from '../../App';
// styles imports
import "./OperationItem.css"

export default function OperationItem(props) {

  // utilize Theme Context 
  const {theme} = useContext(DefaultSettingsContext);
  const themeMode = `--${theme}`

  // utilize custom hooks
  const {
    changeEntryPosition
  } = useApi()

  const {
    projectOperationId,
    operationTitle,
    quantity,
    operationPricePerHour,
    totalValue,
    operationHourTypeName,
    remark,
    positionInProject
  } = props.item;

  const {
    isFirst,
    isLast,
    nextItemId,
    previousItemId
  } = props

  function increasePosition() {
    changeEntryPosition(`../../../data/operation/changeposition?editedOperationId=${projectOperationId}&switchedOperationId=${nextItemId}`)
    props.refreshPage();
  }

  function decreasePosition() {
    changeEntryPosition(`../../../data/operation/changeposition?editedOperationId=${projectOperationId}&switchedOperationId=${previousItemId}`)
    props.refreshPage();
  }


  return (
    <div className={`row__container${themeMode}`}>
        <div className='cell__container--narrower'>{props.position}</div>
        <div className='cell__container--wide'>{operationTitle}</div>
        <div className='cell__container--narrower'>{quantity}</div>
        <div className='cell__container--narrower'>{operationPricePerHour}</div>
        <div className='cell__container--narrower'>{totalValue}</div>
        <div className='cell__container'>{operationHourTypeName && capitalFirstLetter(operationHourTypeName)}</div>
        <div className='cell__container--wide'>
          <Remark text={remark} />
        </div>
        <div className='position-arrows__container'>
          {!isFirst && 
          <FaArrowUp 
            onClick={() => decreasePosition()}
            className='arrow__icon' />}
          {!isLast && 
          <FaArrowDown 
            onClick={() => increasePosition()}
            className='arrow__icon'/>}
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
