import React, { useContext } from 'react'
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

export default function ProjectDetailsMaterials() {

  // utilize ThemeContext
  const {theme} = useContext(ThemeContext)
  const themeMode = `--${theme}`

  const params = useParams()

  return (
    <div className='main-content__container'>
      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItemNarrow>Id</MainContentHeaderContainerItemNarrow>
              <MainContentHeaderContainerItem>Project Number</MainContentHeaderContainerItem>
              <MainContentHeaderContainerItem>Project Client Number</MainContentHeaderContainerItem>
            </MainContentHeaderContainer>
              <div className='rows__container'>
                
            </div>
          </div>
        </MainSectionContainer>

      </MainContentContainer>
    </div>
  )
}
