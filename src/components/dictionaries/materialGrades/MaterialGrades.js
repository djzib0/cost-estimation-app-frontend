import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../../mainContentContainer/MainContentContainer'
import MainSectionContainer from '../../mainSectionContainer/MainSectionContainer'
// contexts imports
import { ThemeContext } from '../../../App';
// custom hooks imports
import useDictionariesApi from '../../../customHooks/useDictionariesApi';

export default function MaterialGrades() {

  const {theme} = useContext(ThemeContext)
  const themeMode = `--${theme}`
  const [materialGradesData, setMaterialGradesData] = useState()

  const {
    getMaterialGradesData,
    materialGrades
  } = useDictionariesApi()

  useEffect(() => {
    getMaterialGradesData();
    if (materialGrades) {
      setMaterialGradesData(materialGrades)
    }
  }, [])

  const materialGradesArr = materialGradesData && materialGrades.map(item => {
    return (
    <div>{item.materialGradeId} - {item.euSymbol} - {item.gerSymbol}</div>
    )
  })
  return (
    <MainContentContainer>
      <MainSectionContainer themeMode={themeMode}>
        <p>Here will be a list of all materials</p>
        <div>
          {materialGradesArr}
        </div>
      </MainSectionContainer>
    </MainContentContainer>
  )
}
