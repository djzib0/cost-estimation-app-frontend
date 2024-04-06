import React, { useContext, useState } from 'react';
// components imports
import CtaButton from '../../../components/buttons/CtaButton';
// context imports
import { DefaultSettingsContext } from '../../../App';

export default function UnitItem(props) {

  // utlizie Theme Context 
  const {theme} = useContext(DefaultSettingsContext);
  const themeMode = `--${theme}`

  const {
    unitName,
    unitNameAbbreviation
  } = props.item

  return (
    <div className={`row__container${themeMode}`}>
        <div className='cell__container--narrower'>{props.position}</div>
        <div className='cell__container'>{unitName}</div>
        <div className='cell__container'>{unitNameAbbreviation}</div>
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
