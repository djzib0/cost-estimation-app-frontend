import React, { useContext } from 'react'
//context imports
import { ThemeContext } from '../../App';

export default function MainContentHeader(props) {

  const { title } = props

  const { theme } = useContext(ThemeContext)
  const themeMode = `--${theme}`

  return (
    <div className='main-content__header'>
      <h2 className={`main-content__header${themeMode}`}>{title}</h2>
    </div>
  )
}
