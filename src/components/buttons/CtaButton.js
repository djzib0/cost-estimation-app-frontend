import React, { useContext } from 'react'
// context imports
import { ThemeContext } from '../../App';
// icons imports
import { IoAdd } from "react-icons/io5"; // add icon
import { CiEdit } from "react-icons/ci"; // edit icon
import { FiTrash2 } from "react-icons/fi"; // delete icon
import { FaCheck } from "react-icons/fa6"; // check icon
import { IoWarningOutline } from "react-icons/io5"; // warning


// styles imports
import './CtaButton.css'

export default function CtaButton({ title, type, variant, handlingFunction = () => {} }) {

  const { theme } = useContext(ThemeContext);
  const themeMode = `--${theme}`;
  const typeStyle = type !== undefined ? `--${type}` : ""
  const variantStyle = variant !== undefined ? `cta-btn--${variant}` : ""

   let icon = ""
  
  if (type === "add") {
    icon = <IoAdd />
  } else if (type === "edit") {
    icon = <CiEdit />
  } else if (type === "delete") {
    icon = <FiTrash2/>
  } else if (type === "confirm") {
    icon = <FaCheck />
  } else if (type === 'warning') {
    icon = <IoWarningOutline />
  }


  return (
    <button className={`cta__button${themeMode}`} onClick={() => handlingFunction()}>
        <div className={`button__title${themeMode} cta-btn__title${typeStyle}${themeMode} title__${variantStyle}`}>{title}</div>
        <div className={`button__icon${themeMode} cta-btn__icon${typeStyle}${themeMode} icon__${variantStyle}`}>{icon}</div>
    </button>
  )
}
