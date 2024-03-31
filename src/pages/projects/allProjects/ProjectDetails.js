import React, { useContext, useEffect, useState } from 'react';
// components imports
import SummaryContainer from '../../../components/summary/SummaryContainer';
// contexts imports
import { useParams } from 'react-router-dom';
import { DefaultSettingsContext } from '../../../App';
import { ModalContext } from '../../../App';
// custom hooks imports
import useApi from '../../../customHooks/useApi';
import useModal from '../../../customHooks/useModal';

export default function ProjectDetails() {

  // utilize DefaultSettingsContext
  const {theme} = useContext(DefaultSettingsContext)
  const themeMode = `--${theme}`

  // utilize ModalContext
  const {isModalOn, toggleModalOn, toggleModalOff} = useContext(ModalContext);

  // utlilize custom hooks
  const {
    modalData,
    setModalData,
    closeModal,
    openModal,
  } = useModal()

  const params = useParams()

  // state variables
  const [projectData, setProjectData] = useState();
  const [refreshedPage, setRefreshedPage] = useState(false);
  

  function refreshPage() {
    setRefreshedPage(prevState => !prevState)
  }

  return (
    <div className='main-content__container'>
        <SummaryContainer />
    </div>
  )
}
