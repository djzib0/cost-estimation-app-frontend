import React, { useContext } from 'react'
// components imports
import MainContentContainer from '../../mainContentContainer/MainContentContainer'
import MainSectionContainer from '../../mainSectionContainer/MainSectionContainer'
// contexts imports
import { ThemeContext } from '../../../App';

export default function MaterialGrades() {

  const {theme} = useContext(ThemeContext)
  const themeMode = `--${theme}`
  return (
    <MainContentContainer>
      <MainSectionContainer themeMode={themeMode}>Here will be a list of all materials</MainSectionContainer>
    </MainContentContainer>
  )
}
