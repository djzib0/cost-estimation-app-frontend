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

  function editItem(id) {
    console.log("item edited", id)
  }

  function deleteItem(id) {
    console.log("item deleted", id)
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
              modalType: "info",
              messageTitle: "Enter new task title",
              elementId: item.materialGradeId,
              value: "",
              handleFunction: {editItem}
            }})}
        deleteItem={deleteItem}/>
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
        elementId={modalData.elementId}
        value={modalData.value}
        refreshPage={() => undefined}
        onClose={closeModal}
        //props with data to add in DB
        leadId=""
        clientId=""
        form={<MaterialGradeEditForm />}
        />}
    </>
  )
}
