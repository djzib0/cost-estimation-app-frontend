import React, { useContext, useEffect, useState} from 'react';
// components imports
import MainContentContainer from '../mainContentContainer/MainContentContainer';
import MainSectionContainer from '../mainContentContainer/MainSectionContainer';
import MainContentContainerTitle from '../mainContentContainer/MainContentContainerTitle';
import MainContentHeaderContainer from '../mainContentContainer/MainContentHeaderContainer';
import MainContentHeaderContainerItem from '../mainContentContainer/MainContentHeaderContainerItem';
import Modal from '../modal/Modal';
import CtaButton from '../buttons/CtaButton';
// context imports
import { useParams } from 'react-router-dom';
import { DefaultSettingsContext } from '../../App';
import { ModalContext } from '../../App';
// custom hooks imports
import useApi from '../../customHooks/useApi';
import useModal from '../../customHooks/useModal';

export default function OutsourcingContainer() {

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
  const [outsourcingData, setOutsourcingData] = useState([]);
  const [refreshedPage, setRefreshedPage] = useState(false);

  // if modal is on when the first render occurs,
  // close modal if any is opened
  useEffect(() => {
    toggleModalOff();
  }, [])

  useEffect(() => {
    getData(`../../../data/project/${params.id}/outsourcing/all`)
    if (fetchedData) {
      setOutsourcingData(fetchedData)
    }
  }, [outsourcingData, refreshedPage])

  function refreshPage() {
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
          projectId: params.id,
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
        handleFunction: () => deleteData(`../../../data/materials/othermaterials/delete/${item.otherMaterialId}`),
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
            <MainContentContainerTitle title={"Other materials"} />
            <div>
            <CtaButton 
                  title="Add new material"
                  type="add"
                  variant="large"
                  handlingFunction={setAddModal}
                  refreshPage={refreshPage}
            /> 
            </div>
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItem variant='narrower' title={"Pos."} />
              <MainContentHeaderContainerItem variant='regular' title={"Name"} />
              <MainContentHeaderContainerItem variant='regular' title={"Quantity"} />
              <MainContentHeaderContainerItem variant='regular' title={"Unit"} />
              <MainContentHeaderContainerItem variant='regular' title={"Price/unit"} />
              <MainContentHeaderContainerItem variant='regular' title={"Total value"} />
              <MainContentHeaderContainerItem variant='regular' title={"Remark"} />
            </MainContentHeaderContainer>
              <div className='rows__container'>
                {/* {otherMaterialsArr} */}
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
        // form={<OtherMaterialForm 
        //   obj={modalData.obj} 
        //   type={modalData.modalType}
        //   refreshPage={refreshPage}
        //   projectId={props.projectId}
        //   closeModal={toggleModalOff}
        //   />}
        />}
    </div>
  )
}
