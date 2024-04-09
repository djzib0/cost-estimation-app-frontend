import React, { useContext, useState } from 'react';
//components imports
import CtaButton from '../buttons/CtaButton';
import RemarkModal from '../remarkModal/RemarkModal';
//context imports
import { DefaultSettingsContext } from '../../App';
//icons imports
import { SlNote } from "react-icons/sl";

export default function OutsourcingItem(props) {

  // utilize Theme Context 
  const {theme} = useContext(DefaultSettingsContext);
  const themeMode = `--${theme}`

  return (
    <div>OutsourcingItem</div>
  )
}
