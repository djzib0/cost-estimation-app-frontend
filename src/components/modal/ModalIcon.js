import React, { useEffect, useState } from 'react'
// icons imports
import { BsExclamationOctagonFill, BsFillInfoCircleFill } from 'react-icons/bs'
// styles imports
import './ModalIcon.css'

export default function ModalIcon(props) {

  const {type} = props;

  const [iconStyle, setIconStyle] = useState()

  useEffect(() => {
    switch(type) {
      case "edit": 
        setIconStyle("modal__icon--info"); break
      case "add": 
      setIconStyle("modal__icon--info"); break
      case "error": 
        setIconStyle("modal__icon--warning"); break
    }
  }, [])



  console.log(iconStyle, " icon style")
  
  return (
    <div className={iconStyle}>
      {type ==='edit' && <BsFillInfoCircleFill />}
      {type ==='add' && <BsFillInfoCircleFill />}
      {type === 'error' && <BsExclamationOctagonFill />}
    </div>
  )
}
