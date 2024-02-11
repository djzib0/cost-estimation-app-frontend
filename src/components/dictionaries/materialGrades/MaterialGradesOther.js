import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../../mainContentContainer/MainContentContainer'
import MainSectionContainer from '../../mainSectionContainer/MainSectionContainer'
import MaterialGradeHeadersContainer from './MaterialGradeHeadersContainer'
import MaterialGradeItem from './MaterialGradeItem'
import MaterialGradeEditForm from './MaterialGradeEditForm';
import Modal from '../../modal/Modal';
// contexts imports
import { ThemeContext } from '../../../App';
// custom hooks imports
import useDictionariesApi from '../../../customHooks/useDictionariesApi';
import useModal from '../../../customHooks/useModal';
// styles import
import './MaterialGrades.css'

export default function MaterialGradesOther() {

  const {theme} = useContext(ThemeContext)
  const themeMode = `--${theme}`
  
  const [materialGradesData, setMaterialGradesData] = useState()

  const {
    modalData,
    setModalData,
    closeModal,
  } = useModal()


  const {
    getMaterialGradesData,
    editMaterialGradesData,
    materialGrades
  } = useDictionariesApi()

  useEffect(() => {
    getMaterialGradesData("other");
    if (materialGrades) {
      setMaterialGradesData(materialGrades)
    }
  }, [])


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
              obj: {item}
            }})}
        />
    )
  })
  
  return (
    <>
      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
            <MaterialGradeHeadersContainer />
            <div className='rows__container'>
              {materialGrades.length === 0 && <p>No data</p>}
              {materialGrades && materialGradesArr}
            </div>
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
        form={<MaterialGradeEditForm obj={modalData.obj} />}
        />}
    </>
  )
}
