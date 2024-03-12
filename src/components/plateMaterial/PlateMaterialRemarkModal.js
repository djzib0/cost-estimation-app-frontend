import React, { useContext } from 'react'
// contexts imports
import { DefaultSettingsContext } from '../../App'
// styles imports
import './PlateMaterialRemarkModal.css'

export default function PlateMaterialRemarkModal(props) {

  // utilize DefaultSettingsContext
  const {theme} = useContext(DefaultSettingsContext)
  const themeMode = `--${theme}`

  return (
    <div className={`remark__modal${themeMode}`}>
      <p className={`remark__text${themeMode}`}>
        {props.remark}
      </p>
      <div className={`arrow-right${themeMode}`}></div>
    </div>
  )
}
