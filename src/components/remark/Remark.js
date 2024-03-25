import React, { useState, useContext} from 'react';
// contexts imports
import { DefaultSettingsContext } from '../../App';
// icons import
import { MdOutlineUnfoldMore } from "react-icons/md";
import { MdOutlineUnfoldLess } from "react-icons/md";
// styles imports
import "./Remark.css"


export default function Remark({text}) {

  // utilize context
  const {theme} = useContext(DefaultSettingsContext)
  const themeMode = `--${theme}`

  const [isExpanded, setIsExpanded] = useState(false);

  function toggleOn() {
    setIsExpanded(prevState => !prevState)
  }

  let allowedRemarkLength = 45;

  return (
    <div className='remark__container'>
      <div className='remark__text'>
        {!isExpanded ?
          (text.length > allowedRemarkLength ? text.slice(0, allowedRemarkLength)  + "..." : text) :
          text}
      </div>
      {text.length > allowedRemarkLength && isExpanded && 
      // className='toggle__btn--round'
        <MdOutlineUnfoldLess
          className={`toggle__btn--round${themeMode}`}
          onClick={toggleOn} />}
      {text.length > allowedRemarkLength && !isExpanded && 
      // className='toggle__btn--round'
        <MdOutlineUnfoldMore
          className={`toggle__btn--round${themeMode}`}      
          onClick={toggleOn} />}
    </div>
  )
}
