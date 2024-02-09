import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../../mainContentContainer/MainContentContainer'
import MainSectionContainer from '../../mainSectionContainer/MainSectionContainer'
import MaterialGradeItem from './MaterialGradeItem'
import MaterialGradeEditForm from './MaterialGradeEditForm';
import Modal from '../../modal/Modal';
// contexts imports
import { ThemeContext } from '../../../App';
// custom hooks imports
import useDictionariesApi from '../../../customHooks/useDictionariesApi';
import useModal from '../../../customHooks/useModal';

export default function MaterialGradesOther() {

  const {theme} = useContext(ThemeContext)
  const themeMode = `--${theme}`

  const {
    modalData,
    setModalData,
    closeModal,
  } = useModal()

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
              Tutaj będzie lista materiałów pozostałych
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
