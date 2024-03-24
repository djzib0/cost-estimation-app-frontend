import React, { useContext } from 'react'
// components imports
import MainContentContainer from '../../../components/mainContentContainer/MainContentContainer'
import MainSectionContainer from '../../../components/mainContentContainer/MainSectionContainer'
import MainContentHeaderContainer from '../../../components/mainContentContainer/MainContentHeaderContainer'
import MainContentHeaderContainerItem from '../../../components/mainContentContainer/MainContentHeaderContainerItem'
// contexts imports
import { DefaultSettingsContext } from '../../../App';
import { ModalContext } from '../../../App';
import { useParams } from 'react-router-dom';

export default function ProjectDetailsMaterials() {

  // utilize DefaultSettingsContext
  const {theme} = useContext(DefaultSettingsContext)
  const themeMode = `--${theme}`

  const params = useParams()

  return (
    <div className='main-content__container'>
      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItem variant={'narrow'}>Id</MainContentHeaderContainerItem>
              <MainContentHeaderContainerItem variant={'regular'}>Project Number</MainContentHeaderContainerItem>
              <MainContentHeaderContainerItem variant={'regular'}>Project Client Number</MainContentHeaderContainerItem>
            </MainContentHeaderContainer>
            <div className='rows__container'>
                
            </div>
          </div>
        </MainSectionContainer>

      </MainContentContainer>
    </div>
  )
}
