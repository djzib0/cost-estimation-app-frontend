import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../mainContentContainer/MainContentContainer';
import MainSectionContainer from '../mainContentContainer/MainSectionContainer';
import MainContentContainerTitle from '../mainContentContainer/MainContentContainerTitle';
import MainContentHeaderContainer from '../mainContentContainer/MainContentHeaderContainer';
import Modal from '../modal/Modal';
import PlateMaterialForm from '../plateMaterial/PlateMaterialForm';
import PlateMaterialItem from '../plateMaterial/PlateMaterialItem';
import CtaButton from '../buttons/CtaButton';
import MainContentHeaderContainerItem from '../mainContentContainer/MainContentHeaderContainerItem';
// context imports
import { useParams } from 'react-router-dom';
import { DefaultSettingsContext } from '../../App';
import { ModalContext } from '../../App';
// custom hooks imports
import useApi from '../../customHooks/useApi';
import useModal from '../../customHooks/useModal';

export default function PlatesContainer(props) {

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
  const [projectData, setProjectData] = useState([]);
  const [refreshedPage, setRefreshedPage] = useState(false);

  function refreshPage() {
    setRefreshedPage(prevState => !prevState)
  }

  // if modal is on when the first render occurs,
  // close modal is any is opened
  useEffect(() => {
    toggleModalOff();
  }, [])

  useEffect(() => {
    getData(`/data/project/${params.id}/materials/platematerial`)
    if (fetchedData) {
      setProjectData(fetchedData)
    }
  }, [projectData, refreshedPage])

  const positionCounter = 0
  const projectDataArr = fetchedData && fetchedData.map((item, index = 1 )=> {
    return (
      <PlateMaterialItem 
        key={item.plateMaterialId} 
        item={item} 
        position={index + 1}
        materialGradeId={item.materialGrade.materialGradeId}
        editItem={setEditModal}
        deleteItem={setDeleteModal}
        />
    )
  })

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
          projectId: params.id,
          plateMaterialId: "",
          materialGradeId: "",
          materialGrade: "",
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
        elementId: item.plateMaterialId,
        value: "",
        obj: {...item}
      }})
    toggleModalOn();
  }

  function setDeleteModal(item) {
    setModalData(prevData => {
      //open new modal with new properties
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
            <div>
            <CtaButton 
                  title="Add new plate"
                  type="add"
                  variant="large"
                  handlingFunction={setAddModal}
                  refreshPage={refreshPage}
            /> 
            </div>
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItem variant='narrower' title={"Pos."} />
              <MainContentHeaderContainerItem variant='narrower' title={"Dim. A [mm]"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Dim. B [mm]"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Thick. [mm]"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Weight [kg]"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Quantity"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Weight total [kg]"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Grade"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Painted?"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Both sides?"} />
              <MainContentHeaderContainerItem variant='narrower' title={<>Area [m<sup>2</sup>]</>} />
              <MainContentHeaderContainerItem variant='narrower' title={"Shape"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Remark"} />
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
          projectId={props.projectId}
          closeModal={toggleModalOff}
          />}
        />}
    </div>
  )
}
