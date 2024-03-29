import React, { useContext } from 'react';
//components imports
import CtaButton from '../../../components/buttons/CtaButton'
//context imports
import { DefaultSettingsContext } from '../../../App';
import { ModalContext } from '../../../App';
//styles imports

export default function MaterialGradeItem(props) {

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
