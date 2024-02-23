import React, { useContext } from 'react';
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

export default function ProjectDetails() {

  // utilize ThemeContext
  const {theme} = useContext(ThemeContext)
  const themeMode = `--${theme}`

  const params = useParams()

  const testData = [
    {
      id: 1,
      projectNumber: "32485",
      projectClientNumber: "WO34503",
    },
    {
      id: 2,
      projectNumber: "32486",
      projectClientNumber: "NOZ14243824",
    },
  ]

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
                Project details will be here - id of project is {params.id}
            </div>
          </div>
        </MainSectionContainer>
      </MainContentContainer>
    </div>
  )
}
