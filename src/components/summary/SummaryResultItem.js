import React, { useContext } from 'react';
// contexts imports 
import { DefaultSettingsContext } from '../../App';
// styles import
import './SummaryResultItem.css'


export default function SummaryResultItem(props) {

  // utilize context
  const {theme} = useContext(DefaultSettingsContext);
  const themeMode = `--${theme}`

  const variant = props.isTop ? "--first-child": ""

  return (
    <div className={`total-value__container${themeMode}`}>
      <div className='summary-title__container'>{props.title}</div>
      <div className='summary-value__container'>{props.value}</div>
      <div className='summary-suffix__container'>{props.suffix}</div>
    </div>
  )
}
