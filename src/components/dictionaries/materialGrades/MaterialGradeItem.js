import React from 'react';
//styles imports
import './MaterialGradeItem.css'

export default function MaterialGradeItem(props) {
  
  const {
    materialGradeId,
    euSymbol,
    gerSymbol,
  } = props.item;


  return (
    <div className='row__container'>
        <div className='cell__container--narrow'>{materialGradeId}</div>
        <div className='cell__container'>{euSymbol}</div>
        <div className='cell__container'>{gerSymbol}</div>
        <div className='cell-cta__container'>
          <button onClick={() => props.editItem(materialGradeId)}>edit</button>
          <button onClick={() => props.deleteItem(materialGradeId)}>delete</button>
        </div>
    </div>
  )
}
