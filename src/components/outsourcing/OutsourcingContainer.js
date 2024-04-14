import React, { useContext, useEffect, useState} from 'react';
// components imports
import MainContentContainer from '../mainContentContainer/MainContentContainer';
import MainSectionContainer from '../mainContentContainer/MainSectionContainer';
import MainContentContainerTitle from '../mainContentContainer/MainContentContainerTitle';
import MainContentHeaderContainer from '../mainContentContainer/MainContentHeaderContainer';
import MainContentHeaderContainerItem from '../mainContentContainer/MainContentHeaderContainerItem';
import MainContentHeaderCtaContainer from '../mainContentContainer/MainContentHeaderCtaContainer';
import Modal from '../modal/Modal';
import CtaButton from '../buttons/CtaButton';
import OutsourcingItem from './OutsourcingItem';
import OutsourcingForm from './OutsourcingForm';
// context imports
import { useParams } from 'react-router-dom';
import { DefaultSettingsContext } from '../../App';
import { ModalContext } from '../../App';
// custom hooks imports
import useApi from '../../customHooks/useApi';
import useModal from '../../customHooks/useModal';

export default function OutsourcingContainer(props) {

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
  const [filterData, setFilterData] = useState(
    {
      outsourcingName: "",
      contractorName: "",
    }
  )

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
        handleFunction: () => deleteData(`../../../data/outsourcing/delete/${item.outsourcingId}`),
        closeFunc: {toggleModalOff},
        obj: {...item}
      }})
      toggleModalOn();
  }

  const outsourcingArr = fetchedData && fetchedData.filter(item => {
    return (
      item.outsourcingName.toString().toLowerCase().includes(filterData.outsourcingName.toString().toLowerCase())
      && item.contractorName.toString().toLowerCase().includes(filterData.contractorName.toString().toLowerCase())
    )
  })
  .map((item, index) => {
    return (
      <OutsourcingItem 
        key={item.outsourcingId}
        item={item}
        position={index + 1}
        editItem={setEditModal}
        deleteItem={setDeleteModal}
      />
    )
  })

  function handleChange(e) {
    const {name, value, type, checked} = e.target
    setFilterData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }
    })
  }


  return (
    <div>
      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
            <MainContentContainerTitle title={"Outsourcing"} />
            <div>
            <CtaButton 
                  title="Add new outsourcing"
                  type="add"
                  variant="large"
                  handlingFunction={setAddModal}
                  refreshPage={refreshPage}
            /> 
            </div>
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItem variant='narrower' title={"Pos."} isFilterTitle/>
              <MainContentHeaderContainerItem
                variant='regular'
                title={"Name"}
                type='text'
                inputName='outsourcingName'
                handleChange={handleChange}
                value={filterData.outsourcingName}
                showInputField
              />
              <MainContentHeaderContainerItem
                variant='regular'
                title={"Contractor"}
                type='text'
                inputName='contractorName'
                handleChange={handleChange}
                value={filterData.contractorName}
                showInputField
              />
              <MainContentHeaderContainerItem variant='regular' title={"Price [PLN]"} />
              <MainContentHeaderContainerItem variant='regular' title={"Remark"} />
            </MainContentHeaderContainer>
              <div className='rows__container'>
                {outsourcingArr}
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
        form={<OutsourcingForm 
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
