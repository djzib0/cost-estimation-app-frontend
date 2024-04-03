import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../../../components/mainContentContainer/MainContentContainer'
import MainSectionContainer from '../../../components/mainContentContainer/MainSectionContainer'
import MainContentHeaderContainer from '../../../components/mainContentContainer/MainContentHeaderContainer'
import MainContentHeaderContainerItem from '../../../components/mainContentContainer/MainContentHeaderContainerItem'
import MaterialGradeItem from './MaterialGradeItem'
import MaterialGradeEditForm from './MaterialGradeEditForm';
import Modal from '../../../components/modal/Modal';
import CtaButton from '../../../components/buttons/CtaButton'
// contexts imports
import { DefaultSettingsContext } from '../../../App';
import { ModalContext } from '../../../App';
// custom hooks imports
import useDictionariesApi from '../../../customHooks/useDictionariesApi';
import useModal from '../../../customHooks/useModal';

export default function MaterialGrades() {

  // constant variables
  const gradeGroupName = "steel"

  // utilize DefaultSettingsContext
  const {theme} = useContext(DefaultSettingsContext)
  const themeMode = `--${theme}`

  // utilize ModalContext
  const {isModalOn, toggleModalOn, toggleModalOff} = useContext(ModalContext);
  

  const [materialGradesData, setMaterialGradesData] = useState();
  const [refreshedPage, setRefreshedPage] = useState(false);

  const {
    modalData,
    setModalData,
    closeModal,
    openModal,
  } = useModal()

  const {
    getMaterialGradesData,
    addMaterialGrade,
    editMaterialGrade,
    deleteMaterialGrade,
    editMaterialGradesData,
    materialGrades,
    fetchError,
    loading
  } = useDictionariesApi()

  // if modal is on when the first render occurs,
  // close modal is any is opened
  useEffect(() => {
    toggleModalOff();
  }, [])

  useEffect(() => {
    getMaterialGradesData(gradeGroupName);
    if (materialGrades) {
      setMaterialGradesData(materialGrades)
    }
  }, [materialGradesData])

  function refreshPage() {
    // fetch new data and trigger useEffect to re render
    getMaterialGradesData(gradeGroupName);
    if (materialGrades) {
      setMaterialGradesData(materialGrades)
    }
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
          materialGradeId: "",
          euSymbol: "",
          gerSymbol: "",
          density: "",
          gradeGroup: gradeGroupName,
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
        elementId: item.materialGradeId,
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
        messageTitle: "Do you want to delete this material grade?",
        messageText: "If you press OK, it will be permanently removed from the database.",
        elementId: item.materialGradeId,
        value: "",
        refreshFunc: refreshPage,
        handleFunction: deleteMaterialGrade,
        closeFunc: {toggleModalOff},
        obj: {...item}
      }})
      toggleModalOn();
  }


  const materialGradesArr = materialGradesData && materialGrades.map(item => {
    return (
        <MaterialGradeItem 
        key={item.materialGradeId}
        item={item}
        editItem={() => setEditModal(item)}
        deleteItem={() => setDeleteModal(item)}
        />
    )
  }).sort((a, b) => b - a)
  
  return (
    <>
      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
            <div>
              <CtaButton 
                title="Add new material"
                type="add"
                variant="large"
                handlingFunction={setAddModal}
                /> 
            </div>
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItem variant={'narrow'} title={"Id"} />
              <MainContentHeaderContainerItem variant={'regular'} title={"European"} />
              <MainContentHeaderContainerItem variant={'regular'} title={"German"} />
              <MainContentHeaderContainerItem variant={'regular'}>Density {`[`}g/cm<sup>3</sup>{`]`}</MainContentHeaderContainerItem>
              <div className='header-cta__container'></div>
            </MainContentHeaderContainer>
            <div className='rows__container'>
              {materialGrades.length === 0 && <p>No data</p>}
              {materialGrades && materialGradesArr}
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
    </>
  )
}
