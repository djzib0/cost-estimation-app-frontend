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
      <div className='cell__container--regular'>{capitalFirstLetter(type)}</div>
      <div className='cell__container--regular'>{quantity}</div>
      <div className='cell__container--regular'>{pricePerHr},-</div>
      <div className='cell__container--regular'>{pricePerHr * quantity} ,-</div>
    </div>
  )
}
