import React, { useContext, useState } from 'react';
// components imports
import RemarkModal from '../remarkModal/RemarkModal';
import CtaButton from '../buttons/CtaButton';
// utils imports
import { capitalFirstLetter } from '../../utils/utils'
//icons imports
import { SlNote } from "react-icons/sl";
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
    remark
  } = props.item;

  console.log(props.item)

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
        <div className='cell__container--narrower'>{operationTitle}</div>
        <div className='cell__container--narrower'>{quantity}</div>
        <div className='cell__container--narrower'>{operationPricePerHour}</div>
        <div className='cell__container--narrower'>{totalValue}</div>
        <div className='cell__container--narrower'>{operationHourTypeName && capitalFirstLetter(operationHourTypeName)}</div>
        <div className='cell__container--narrower'>{remark}</div>
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
