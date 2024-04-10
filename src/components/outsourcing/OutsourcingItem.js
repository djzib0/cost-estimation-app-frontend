import React, { useContext, useState } from 'react';
//components imports
import CtaButton from '../buttons/CtaButton';
import RemarkModal from '../remarkModal/RemarkModal';
//context imports
import { DefaultSettingsContext } from '../../App';
//icons imports
import { SlNote } from "react-icons/sl";
// utils imports
import { capitalFirstLetter, formatValueToCurrency } from '../../utils/utils';

export default function OutsourcingItem(props) {

  const {
    outsourcingName,
    contractorName,
    outsourcingValue,
    remark,
  } = props.item;

  // utilize Theme Context 
  const {theme} = useContext(DefaultSettingsContext);
  const themeMode = `--${theme}`

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
        <div className='cell__container'>{capitalFirstLetter(outsourcingName)}</div>
        <div className='cell__container'>{capitalFirstLetter(contractorName)}</div>
        <div className='cell__container'>{formatValueToCurrency(outsourcingValue)},-</div>
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
