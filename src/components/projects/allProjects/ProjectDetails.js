import React, { useContext, useEffect, useState } from 'react';
// components imports
import MainContentContainer from '../../mainContentContainer/MainContentContainer'
import MainSectionContainer from '../../mainContentContainer/MainSectionContainer'
import MainContentHeaderContainer from '../../mainContentContainer/MainContentHeaderContainer'
import MainContentHeaderContainerItem from '../../mainContentContainer/MainContentHeaderContainerItem'
import MainContentHeaderContainerItemNarrow from '../../mainContentContainer/MainContentHeaderContainerItemNarrow'
import Modal from '../../modal/Modal';
import CtaButton from '../../buttons/CtaButton'
// contexts imports
import { ThemeContext } from '../../../App';
import { ModalContext } from '../../../App';
import { useParams } from 'react-router-dom';
// custom hooks imports
import useApi from '../../../customHooks/useApi';

export default function ProjectDetails() {

  // utilize ThemeContext
  const {theme} = useContext(ThemeContext)
  const themeMode = `--${theme}`
  
  const params = useParams()

  const {
    fetchedData,
    fetchError,
    getData
  } = useApi()

  // state variables
  const [projectData, setProjectData] = useState();
  const [isFetched, setIsFetched] = useState(false)
  

  useEffect(() => {
    getData(`/data/projects/${params.id}`)
  }, [])

  useEffect(() => {
    setProjectData(fetchedData)
  }, [fetchedData])

  const plateMaterialsArr = fetchedData && projectData.map(item => {
    console.log(item, "item")
      return (
        <div>{item}kjkj</div>
      )
    })

  console.log(projectData && projectData.plateMaterials, " dupa")
  

  return (
    <div className='main-content__container'>
      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItemNarrow>Materials</MainContentHeaderContainerItemNarrow>
            </MainContentHeaderContainer>
              <div className='rows__container'>
                Project details will be here - id of project is {params.id}
                {/* {plateMaterialsArr} */}
            </div>
          </div>
        </MainSectionContainer>
      </MainContentContainer>
    </div>
  )
}
