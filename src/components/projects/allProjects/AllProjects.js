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
import AllProjectsForm from './AllProjectsForm';
// contexts imports
import { DefaultSettingsContext } from '../../../App';
import { ModalContext } from '../../../App';
// custom hooks imports
import useApi from '../../../customHooks/useApi';
import useModal from '../../../customHooks/useModal';

export default function AllProjects() {

  // utilize DefaultSettingsContext
  const {theme} = useContext(DefaultSettingsContext)
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
    getData("/data/projects");
    if (fetchedData) {
      setProjectsData(fetchedData)
    }
  }, [projectsData])

  function refreshPage() {
    setRefreshedPage(prevState => !prevState)
  }


  function setAddModal() {
    setModalData(prevData => {
      //open new modal with new properties
      return {
        ...prevData,
        isActive: true,
        modalType: "add",
        messageTitle: "Enter values",
        messageText: "Please enter the data in all input fields",
        elementId: "",
        value: "",
        obj: {
          projectNumber: "",
          projectClientNumber: "",
          title: "title",
          projectType:  "",
          drawingNumber: "",
          materialMargin: "",
          outsourcingMargin: "",
          salesMargin: "",
        }
      }})
    toggleModalOn();
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
        elementId: item.projectId,
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
          <div>
              <CtaButton 
                title="Add new project"
                type="add"
                variant="large"
                handlingFunction={setAddModal}
                /> 
            </div>
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItemNarrow title={"Id"} />
              <MainContentHeaderContainerItem title={"Project number"} />
              <MainContentHeaderContainerItem title={"Project client number"} />
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
        form={<AllProjectsForm 
          obj={modalData.obj} 
          type={modalData.modalType}
          refreshPage={refreshPage}
          closeModal={toggleModalOff}
          />}
        />}
    </div>
  )
}
