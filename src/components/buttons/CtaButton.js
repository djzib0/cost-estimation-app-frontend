import React, { useContext } from 'react'
// context imports
import { DefaultSettingsContext } from '../../App';
// icons imports
import { IoAdd } from "react-icons/io5"; // add icon
import { CiEdit } from "react-icons/ci"; // edit icon
import { FiTrash2 } from "react-icons/fi"; // delete icon
import { FaCheck } from "react-icons/fa6"; // check icon
import { IoWarningOutline } from "react-icons/io5"; // warning
import { MdOutlineCancel } from "react-icons/md"; // cancel icon
import { IoFolderOpenOutline } from "react-icons/io5"; // open icon

// styles imports
import './CtaButton.css'

// INSTRUCTION: HOW TO USE THIS COMPONENT 
// import this component in another component
// pass props like in example below
{/* <CtaButton 
    title="Add new material"
    type="add"
    variant="large"
    handlingFunction={setModal}
/>  */}


export default function CtaButton({ title, type, variant, handlingFunction = () => {} }) {

  const { theme } = useContext(DefaultSettingsContext);
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
  } else if (type === 'cancel') {
    icon = <MdOutlineCancel />
  } else if (type === 'open') {
    icon = <IoFolderOpenOutline />
  }



  return (
    <button className={`cta__button${themeMode}`} onClick={handlingFunction}>
        <div className={`button__title${themeMode} cta-btn__title${typeStyle}${themeMode} title__${variantStyle}`}>{title}</div>
        <div className={`button__icon${themeMode} cta-btn__icon${typeStyle}${themeMode} icon__${variantStyle}`}>{icon}</div>
    </button>
  )
}
