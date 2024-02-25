import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
// components imports
import MainContentContainer from '../../mainContentContainer/MainContentContainer'
import MainSectionContainer from '../../mainContentContainer/MainSectionContainer'
import MainContentHeaderContainer from '../../mainContentContainer/MainContentHeaderContainer'
import MainContentHeaderContainerItem from '../../mainContentContainer/MainContentHeaderContainerItem'
import MainContentHeaderContainerItemNarrow from '../../mainContentContainer/MainContentHeaderContainerItemNarrow'
import ProjectDetailsItem from './ProjectDetailsItem';
import Modal from '../../modal/Modal';
import CtaButton from '../../buttons/CtaButton'
import MaterialGradeEditForm from '../../dictionaries/materialGrades/MaterialGradeEditForm';
// contexts imports
import { ThemeContext } from '../../../App';
import { ModalContext } from '../../../App';
// custom hooks imports
import useApi from '../../../customHooks/useApi';
import useModal from '../../../customHooks/useModal';

export default function AllProjects() {

  // utilize ThemeContext
  const {theme} = useContext(ThemeContext)
  const themeMode = `--${theme}`

   // utilize ModalContext
   const {isModalOn, toggleModalOn, toggleModalOff} = useContext(ModalContext);
  

  // utlilize custom hooks
  const {
    getData,
    fetchedData,
    fetchError
  } = useApi();

  const {
    modalData,
    setModalData,
    closeModal,
    openModal,
  } = useModal()

  // state variables
  const [projectsData, setProjectsData] = useState();
  const [refreshedPage, setRefreshedPage] = useState(false);
  
  useEffect(() => {
    // async function fetchProjectData() {
    //   getData("/data/projects")
    // }
    // fetchProjectData()
    getData("/data/projects");
    if (fetchedData) {
      setProjectsData(fetchedData)
    }
  }, [projectsData])

  function refreshPage() {
    getData("/data/projects");
    if (fetchedData) {
      setProjectsData(fetchedData)
    }
  }


  function setEditModal(item) {
    setModalData(prevData => {
      //open new modal with new properties
      return {
        ...prevData,
        isActive: true,
        modalType: "edit",
        messageTitle: "Enter new values",
        messageText: "Please enter the data in all input fields",
        elementId: item.materialGradeId,
        value: "",
        obj: {...item}
      }})
    toggleModalOn();
  }

  const projectsDataArr = fetchedData && fetchedData.map(item => {
    return (
      <ProjectDetailsItem
        key={item.projectId}
        item={item}
        editItem={() => setEditModal(item)}
      />
    )
  })

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
              {projectsDataArr}
            </div>
          </div>
        </MainSectionContainer>
      </MainContentContainer>
      {isModalOn && 
      <Modal
        isActive={modalData.isActive}
        modalType={modalData.modalType}
        messageTitle={modalData.messageTitle}
        messageText={modalData.messageText}
        handleFunction={modalData.handleFunction}
        onClose={toggleModalOff}
        obj={modalData.obj}
        refreshPage={refreshPage}
        form={<MaterialGradeEditForm 
          obj={modalData.obj} 
          type={modalData.modalType}
          refreshPage={refreshPage}
          closeModal={toggleModalOff}
          />}
        />}
    </div>
  )
}
