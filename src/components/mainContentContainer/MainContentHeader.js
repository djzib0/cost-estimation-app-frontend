import React, { useContext } from 'react'
//context imports
import { DefaultSettingsContext } from '../../App';

export default function MainContentHeader(props) {

  const { title } = props

  const { theme } = useContext(DefaultSettingsContext)
  const themeMode = `--${theme}`

  return (
    <div className='main-content__header'>
      <h2 className={`main-content__header${themeMode}`}>{title}</h2>
    </div>
  )
}
