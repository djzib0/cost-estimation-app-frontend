import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../../mainContentContainer/MainContentContainer'
import MainSectionContainer from '../../mainSectionContainer/MainSectionContainer'
import MaterialGradeHeadersContainer from './MaterialGradeHeadersContainer'
import MaterialGradeItem from './MaterialGradeItem'
import MaterialGradeEditForm from './MaterialGradeEditForm';
import Modal from '../../modal/Modal';
import CtaButton from '../../buttons/CtaButton'
import TestCalculatingKgsByGradeAndThickness from './TestCalculatingKgsByGradeAndThickness'
// contexts imports
import { ThemeContext } from '../../../App';
// custom hooks imports
import useDictionariesApi from '../../../customHooks/useDictionariesApi';
import useModal from '../../../customHooks/useModal';
import useFetch from '../../../customHooks/useFetch'
// styles import
import './MaterialGrades.css'

export default function MaterialGrades() {

  const {theme} = useContext(ThemeContext)
  const themeMode = `--${theme}`
  
  const [materialGradesData, setMaterialGradesData] = useState();
  const [refreshedPage, setRefreshedPage] = useState(false);

  const {
    modalData,
    setModalData,
    closeModal,
    openModal,
  } = useModal()

  const {data, updateUrl, error} = useFetch();

  

  const {
    getMaterialGradesData,
    addMaterialGrade,
    editMaterialGrade,
    deleteMaterialGrade,
    editMaterialGradesData,
    materialGrades,
    fetchError,
  } = useDictionariesApi()


  useEffect(() => {
    getMaterialGradesData("steel");
    if (materialGrades) {
      setMaterialGradesData(materialGrades)
    }
  }, [materialGradesData])


  function refreshPage() {
    // fetch new data and trigger useEffect to re render
    console.log("refreshing page")
    getMaterialGradesData("steel");
    if (materialGrades) {
      setMaterialGradesData(materialGrades)
    }
  }

  function setModal() {
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
          gradeGroup: ""
        }
      }})
    openModal();
  }


  const materialGradesArr = materialGradesData && materialGrades.map(item => {
    return (
        <MaterialGradeItem 
        key={item.materialGradeId}
        item={item}
        editItem={() => setModalData(prevData => {
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
        }
        deleteItem={() => setModalData(prevData => {
          //open new modal with new properties
          return {
            ...prevData,
            isActive: true,
            modalType: "delete",
            messageTitle: "Do you want to delete this material grade?",
            messageText: "If you press OK, it will be permanently removed from the database.",
            elementId: item.materialGradeId,
            value: "",
            refreshFunc: {refreshPage},
            handleFunction: {deleteMaterialGrade},
            obj: {...item}

          }})
        }
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
                handlingFunction={setModal}
                /> 
            </div>
            <MaterialGradeHeadersContainer />
            <div className='rows__container'>
              {materialGrades.length === 0 && <p>No data</p>}
              {materialGrades && materialGradesArr}
            </div>
            <TestCalculatingKgsByGradeAndThickness />
          </div>
        </MainSectionContainer>
      </MainContentContainer>
      {modalData.isActive && 
      <Modal
        isActive={modalData.isActive}
        modalType={modalData.modalType}
        messageTitle={modalData.messageTitle}
        messageText={modalData.messageText}
        handleFunction={modalData.handleFunction}
        onClose={closeModal}
        obj={modalData.obj}
        refreshPage={refreshPage}
        form={<MaterialGradeEditForm 
          obj={modalData.obj} 
          type={modalData.modalType}
          refreshPage={refreshPage}
          closeModal={closeModal}
          />}
        />}
    </>
  )
}
