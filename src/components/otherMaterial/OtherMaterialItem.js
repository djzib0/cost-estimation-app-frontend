import React, { useContext, useState } from 'react';
//components imports
import CtaButton from '../buttons/CtaButton';
import RemarkModal from '../remarkModal/RemarkModal';
//context imports
import { DefaultSettingsContext } from '../../App';
//icons imports
import { SlNote } from "react-icons/sl";

export default function OtherMaterialItem(props) {

  // utlizie Theme Context 
  const {theme} = useContext(DefaultSettingsContext);
  const themeMode = `--${theme}`

  const {
    otherMaterialId,
    otherMaterialName,
    quantity,
    unitName,
    pricePerUnit,
    totalValue,
    remark,
    projectId,
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
        <div className='cell__container'>{otherMaterialName}</div>
        <div className='cell__container'>{quantity}</div>
        <div className='cell__container'>{unitName}</div>
        <div className='cell__container'>{pricePerUnit}</div>
        <div className='cell__container'>{totalValue}</div>
        <div className='cell__container'>{remark}</div>
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
