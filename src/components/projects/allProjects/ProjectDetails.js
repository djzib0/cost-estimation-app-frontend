import React, { useContext, useEffect, useState } from 'react';
// components imports
import MainContentContainer from '../../mainContentContainer/MainContentContainer'
import MainContentContainerTitle from '../../mainContentContainer/MainContentContainerTitle';
import MainSectionContainer from '../../mainContentContainer/MainSectionContainer'
import MainContentHeaderContainer from '../../mainContentContainer/MainContentHeaderContainer'
import MainContentHeaderContainerItem from '../../mainContentContainer/MainContentHeaderContainerItem'
import MainContentHeaderContainerItemNarrow from '../../mainContentContainer/MainContentHeaderContainerItemNarrow'
import Modal from '../../modal/Modal';
import CtaButton from '../../buttons/CtaButton';
import PlateMaterialItem from '../../plateMaterial/PlateMaterialItem';
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
    isFetched,
    getData
  } = useApi()

  // state variables
  const [projectData, setProjectData] = useState();
  

  useEffect(() => {
    getData(`/data/projects/${params.id}`)
    if (fetchedData) {
      setProjectData(fetchedData)
    }
  }, [projectData])

  // mapping plate materials (move to project Materials component!!)
  const projectDataArr = fetchedData.plateMaterials && fetchedData.plateMaterials.map(item => {
      console.log(item)
      return (
        <PlateMaterialItem 
          key={item.plateMaterialId} 
          item={item} 
          position={1}
          />
      )
    })


  return (
    <div className='main-content__container'>
      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
          <MainContentContainerTitle title={"Plates"} />
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItemNarrow title={"Pos."} />
              <MainContentHeaderContainerItemNarrow title={"Dim. A [mm]"} />
              <MainContentHeaderContainerItemNarrow title={"Dim. B [mm]"} />
              <MainContentHeaderContainerItemNarrow title={"Thick. [mm]"} />
              <MainContentHeaderContainerItemNarrow title={"Weight [kg]"} />
              <MainContentHeaderContainerItemNarrow title={"Grade"} />
              <MainContentHeaderContainerItemNarrow title={"Painted?"} />
              <MainContentHeaderContainerItemNarrow title={"Both sides?"} />
              <MainContentHeaderContainerItemNarrow title={"Area [m2]"} />
            </MainContentHeaderContainer>
              <div className='rows__container'>
                {projectDataArr}

            </div>
          </div>
        </MainSectionContainer>
      </MainContentContainer>
    </div>
  )
}
