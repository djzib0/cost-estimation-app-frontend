import React, { useContext } from 'react'
// contexts imports
import { DefaultSettingsContext } from '../../App'
// utilities imports
import { capitalFirstLetter } from '../../utils/utils';

export default function SummaryOperationItem(props) {

  const {
    position,
    type,
    quantity,
    pricePerHr
  } = props

  // utilize Theme Context 
  const {theme} = useContext(DefaultSettingsContext);
  const themeMode = `--${theme}`

  return (
    <div className={`row__container${themeMode}`}>
      <div className='cell__container--narrower'>{position}</div>
      <div className='cell__container--narrower'>{capitalFirstLetter(type)}</div>
      <div className='cell__container--narrower'>{quantity}</div>
      <div className='cell__container--narrower'>{pricePerHr}</div>
      <div className='cell__container--narrower'>{pricePerHr * quantity}</div>
    </div>
  )
}
