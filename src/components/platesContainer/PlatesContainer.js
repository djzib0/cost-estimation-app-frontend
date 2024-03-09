import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../mainContentContainer/MainContentContainer';
import MainSectionContainer from '../mainContentContainer/MainSectionContainer';
import MainContentContainerTitle from '../mainContentContainer/MainContentContainerTitle';
import MainContentHeaderContainer from '../mainContentContainer/MainContentHeaderContainer';
import MainContentHeaderContainerItemNarrow from '../mainContentContainer/MainContentHeaderContainerItemNarrow';
import Modal from '../modal/Modal';
import PlateMaterialForm from '../plateMaterial/PlateMaterialForm';
import PlateMaterialItem from '../plateMaterial/PlateMaterialItem';
// context imports
import { useParams } from 'react-router-dom';
import { DefaultSettingsContext } from '../../App';
import { ModalContext } from '../../App';
// custom hooks imports
import useApi from '../../customHooks/useApi';
import useModal from '../../customHooks/useModal';

export default function PlatesContainer() {

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

  const {
    fetchedData,
    fetchError,
    isFetched,
    getData,
    deleteData
  } = useApi()

  const params = useParams()

  // state variables
  const [projectData, setProjectData] = useState();
  const [refreshedPage, setRefreshedPage] = useState(false);

  function refreshPage() {
    console.log("refreshing")
    setRefreshedPage(prevState => !prevState)
  }

  useEffect(() => {
    getData(`/data/projects/${params.id}`)
    if (fetchedData) {
      setProjectData(fetchedData)
    }
  }, [projectData, refreshedPage])

  const projectDataArr = fetchedData.plateMaterials && fetchedData.plateMaterials.map(item => {
    return (
      <PlateMaterialItem 
        key={item.plateMaterialId} 
        item={item} 
        position={1}
        materialGradeId={item.materialGrade.materialGradeId}
        editItem={setEditModal}
        deleteItem={setDeleteModal}
        />
    )
  })

  function setEditModal(item) {
    setModalData(prevData => {
      //open new modal with new properties
      return {
        ...prevData,
        isActive: true,
        modalType: "edit",
        messageTitle: "Enter new values",
        messageText: "Please enter the data in all input fields",
        elementId: item.plateMaterialId,
        value: "",
        obj: {...item}
      }})
    toggleModalOn();
  }

  function setDeleteModal(item) {
    setModalData(prevData => {
      //open new modal with new properties
      console.log("item in delete", item)
      return {
        ...prevData,
        isActive: true,
        modalType: "delete",
        messageTitle: "Do you want to delete this element?",
        messageText: "If you press OK, it will be permanently removed from the database.",
        elementId: item.projectid,
        value: "",
        refreshFunc: {refreshPage},
        handleFunction: () => deleteData(`../../../data/materials/platematerial/delete/${item.plateMaterialId}`),
        closeFunc: {toggleModalOff},
        obj: {...item}
      }})
      toggleModalOn();
  }
  
  return (
    <div>
      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
          <MainContentContainerTitle title={"Plates"} />
            Tutaj ma być tylko summary, przenieść detale materiałów do Materials
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
        form={<PlateMaterialForm 
          obj={modalData.obj} 
          type={modalData.modalType}
          refreshPage={refreshPage}
          closeModal={toggleModalOff}
          />}
        />}
    </div>
  )
}
