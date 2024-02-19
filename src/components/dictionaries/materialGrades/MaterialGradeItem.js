import React, { useContext } from 'react';
//components imports
import CtaButton from '../../buttons/CtaButton';
//context imports
import { ThemeContext } from '../../../App';
//styles imports
import './MaterialGradeItem.css'

export default function MaterialGradeItem(props) {

  const {theme} = useContext(ThemeContext);
  const themeMode = `--${theme}`
  
  const {
    materialGradeId,
    euSymbol,
    gerSymbol,
    density
  } = props.item;


  return (
    <div className={`row__container${themeMode}`}>
        <div className='cell__container--narrow'>{materialGradeId}</div>
        <div className='cell__container'>{euSymbol}</div>
        <div className='cell__container'>{gerSymbol}</div>
        <div className='cell__container'>{density}</div>
        <div className='cell-cta__container'>
          <CtaButton 
                  title="edit"
                  type="edit"
                  variant="medium"
                  handlingFunction={() => props.editItem(materialGradeId)}
          /> 
          <CtaButton 
                  title="delete"
                  type="delete"
                  variant="medium"
                  handlingFunction={() => props.deleteItem(materialGradeId)}
          />
        </div>
    </div>
  )
}
