import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../../mainContentContainer/MainContentContainer'
import MainSectionContainer from '../../mainSectionContainer/MainSectionContainer'
import Modal from '../../modal/Modal';
// contexts imports
import { ThemeContext } from '../../../App';
// custom hooks imports
import useDictionariesApi from '../../../customHooks/useDictionariesApi';
import useModal from '../../../customHooks/useModal';
// styles import


export default function OperationsWelding() {

  const {theme} = useContext(ThemeContext)
  const themeMode = `--${theme}`

  const [operationsData, setOperationsData] = useState();

  // preparing custom hook to use in this component
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
              <div className='header__container'>Name</div>
              <div className='header__container--narrow'>Group</div>
              <div className='header__container--narrow'>Cost/hr</div>
              <div className='header-cta__container'>

              </div>
            </div>
            <div className='rows__container'>
              {/* {materialGradesArr} */}
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
        // form={<MaterialGradeEditForm obj={modalData.obj} />}
        />}
    </>
  )
}

