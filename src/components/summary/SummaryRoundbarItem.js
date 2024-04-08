import React, { useContext } from 'react';
// context imports
import { DefaultSettingsContext } from '../../App';
// utilities imports
import { capitalFirstLetter, formatValueToCurrency } from '../../utils/utils';


export default function SummaryRoundbarItem(props) {

  const {
    position,
    grade,
    totalValue,
    totalWeight,
    allRoundbarMaterialsTotalWeight
  } = props

  // utilize Theme Context 
  const {theme} = useContext(DefaultSettingsContext);
  const themeMode = `--${theme}`

  const percentageWeightShare = totalWeight / allRoundbarMaterialsTotalWeight * 100


  return (
    <div className={`row__container${themeMode}`}>
      <div className='cell__container--narrower'>{position}</div>
      <div className='cell__container--regular'>{capitalFirstLetter(grade)}</div>
      <div className='cell__container--regular'>{totalWeight}</div>
      <div className='cell__container--regular'>{formatValueToCurrency(totalValue)},-</div>
      <div className='cell__container--regular'>{percentageWeightShare.toFixed(1)}%</div>
  </div>
  )
}
