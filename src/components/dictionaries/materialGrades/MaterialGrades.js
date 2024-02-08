import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../../mainContentContainer/MainContentContainer'
import MainSectionContainer from '../../mainSectionContainer/MainSectionContainer'
import MaterialGradeItem from '../materialGradeItem/MaterialGradeItem';
import MaterialGradeEditForm from '../materialGradeEditForm/MaterialGradeEditForm';
import Modal from '../../modal/Modal';
// contexts imports
import { ThemeContext } from '../../../App';
// custom hooks imports
import useDictionariesApi from '../../../customHooks/useDictionariesApi';
import useModal from '../../../customHooks/useModal';
// styles import
import './MaterialGrades.css'

export default function MaterialGrades() {

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
    getMaterialGradesData();
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
            <div className='headers__container'> 
              <div className='header__container--narrow'>Id</div>
              <div className='header__container'>European</div>
              <div className='header__container'>German</div>
              <div className='header-cta__container'></div>
            </div>
            <div className='rows__container'>
              {materialGradesArr}
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
