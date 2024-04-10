import React, { useContext } from 'react';
// context imports
import { DefaultSettingsContext } from '../../App';
// utilities imports
import { capitalFirstLetter, formatValueToCurrency } from '../../utils/utils';


export default function SummaryOutsourcingItem(props) {

  const {
    position,
    name,
    outsourcingTotalValue
  } = props;

// utilize Theme Context 
const {theme} = useContext(DefaultSettingsContext);
const themeMode = `--${theme}`

return (
  <div className={`row__container${themeMode}`}>
    <div className='cell__container--narrower'>{position}</div>
    <div className='cell__container'>{capitalFirstLetter(name)}</div>
    <div className='cell__container'>{formatValueToCurrency(outsourcingTotalValue)},-</div>
  </div>
)
}
