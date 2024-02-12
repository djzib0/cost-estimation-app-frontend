import React, { useContext } from 'react'
// context imports
import { ThemeContext } from '../../App';
// icons imports
import { IoAdd } from "react-icons/io5"; // add icon
import { CiEdit } from "react-icons/ci"; // edit icon
import { FiTrash2 } from "react-icons/fi"; // delete icon
// styles imports
import './CtaButton.css'
// images imports
import iconAdd from '../../images/icon-add.svg'

export default function CtaButton({ title, type, variant, handlingFunction = () => {} }) {

  const { theme } = useContext(ThemeContext);
  const themeMode = `--${theme}`;
  const typeStyle = type !== undefined ? `--${type}` : ""
  const variantStyle = variant !== undefined ? `cta-btn--${variant}` : ""

  console.log(type)

  let icon = ""
  
  if (type === "add") {
    icon = iconAdd
    // icon = <IoAdd />
  } else if (type === "edit") {
    icon = <CiEdit />
  } else if (type === "delete") {
    icon = <FiTrash2/>
  }


  return (
    <button className={`cta__button${themeMode}`} onClick={() => handlingFunction()}>
      {/* <div className='cta__button__container'> */}
        <div className={`button__title${themeMode} cta-btn__title${typeStyle}${themeMode} ${variantStyle}`}>{title}</div>
        <div className={`button__icon${themeMode} cta-btn__icon${typeStyle}${themeMode} ${variantStyle}`}>
        </div>
    </button>
  )
}
