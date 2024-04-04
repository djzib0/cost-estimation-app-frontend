import React from 'react';
// styles import
import './SummaryResultItem.css'


export default function SummaryResultItem(props) {

  const variant = props.isTop ? "--first-child": ""

  return (
    <div className={`total-value__container${variant}`}>
      <div className='summary-title__container'>{props.title}</div>
      <div className='summary-value__container'>{props.value}</div>
      <div className='summary-suffix__container'>{props.suffix}</div>
    </div>
  )
}
