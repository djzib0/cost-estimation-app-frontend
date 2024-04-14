import React, { useContext, useEffect, useState } from 'react';
// components imports
import MainContentContainer from '../../../components/mainContentContainer/MainContentContainer'
import MainSectionContainer from '../../../components/mainContentContainer/MainSectionContainer'
import MainContentHeaderContainer from '../../../components/mainContentContainer/MainContentHeaderContainer'
import MainContentHeaderContainerItem from '../../../components/mainContentContainer/MainContentHeaderContainerItem'
import Modal from '../../../components/modal/Modal';
import CtaButton from '../../../components/buttons/CtaButton';
import UnitItem from './UnitItem';
import UnitsForm from './UnitsForm';
// contexts imports
import { DefaultSettingsContext } from '../../../App';
import { ModalContext } from '../../../App';
// custom hooks imports
import useApi from '../../../customHooks/useApi';
import useModal from '../../../customHooks/useModal';


export default function UnitsContainer() {
  
  // state variables
  const [unitsData, setUnitsData] = useState([]);
  const [refreshedPage, setRefreshedPage] = useState(false);

  // utilize DefaultSettingsContext
  const {theme} = useContext(DefaultSettingsContext)
  const themeMode = `--${theme}`

  // utilize ModalContext
  const {isModalOn, toggleModalOn, toggleModalOff} = useContext(ModalContext);
  

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

  // if modal is on when the first render occurs,
  // close modal is any is opened
  useEffect(() => {
    toggleModalOff();
  }, [])

  useEffect(() => {
    getData(`/data/units`)
    if (fetchedData) {
      setUnitsData(fetchedData)
    }
  }, [unitsData, refreshedPage])

  // useEffect(() => {
  //   setUnitsData(fetchedData)
  // }, [fetchedData])

  function refreshPage() {
    // fetch new data and trigger useEffect to re render
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
          unitName: "",
          unitNameAbbreviation: ""
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
        elementId: item.unitId,
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
        handleFunction: () => deleteData(`../../../data/units/delete/${item.unitId}`),
        closeFunc: {toggleModalOff},
        obj: {...item}
      }})
      toggleModalOn();
  }

  const unitsDataArr = unitsData && fetchedData.map((item, index) => {
    const position = index + 1;
    return (
      <UnitItem 
        key={item.unitId}
        item={item}
        position={position}
        editItem={() => setEditModal(item)}
        deleteItem={() => setDeleteModal(item)}
      />
    )
  })

  return (
    <>
      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
            <div>
              <CtaButton 
                title="Add new unit"
                type="add"
                variant="large"
                handlingFunction={setAddModal}
                /> 
            </div>
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItem variant={'narrower'} title={"Pos."} />
              <MainContentHeaderContainerItem variant={'regular'} title={"Unit Name"} />
              <MainContentHeaderContainerItem variant={'regular'} title={"Abbreviation"} />
              <div className='header-cta__container'></div>
            </MainContentHeaderContainer>
            <div className='rows__container'>
              {unitsData.length === 0 && <p>No data</p>}
              {unitsData && unitsDataArr}
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
        form={<UnitsForm 
          obj={modalData.obj} 
          type={modalData.modalType}
          refreshPage={refreshPage}
          closeModal={toggleModalOff}
          />}
        />}
    </>
  )
}
