import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../mainContentContainer/MainContentContainer';
import MainSectionContainer from '../mainContentContainer/MainSectionContainer';
import MainContentContainerTitle from '../mainContentContainer/MainContentContainerTitle';
import MainContentHeaderContainer from '../mainContentContainer/MainContentHeaderContainer';
import MainContentHeaderContainerItem from '../mainContentContainer/MainContentHeaderContainerItem';
import MainContentHeaderCtaContainer from '../mainContentContainer/MainContentHeaderCtaContainer';
import Modal from '../modal/Modal';
import CtaButton from '../buttons/CtaButton';
// params import
import { useParams } from 'react-router-dom';
// context imports
import { DefaultSettingsContext } from '../../App';
import { ModalContext } from '../../App';
// custom hooks imports
import useApi from '../../customHooks/useApi';
import useModal from '../../customHooks/useModal';
import ProjectDetailItem from '../../pages/projects/allProjects/ProjectDetailsItem';
import OperationItem from './OperationItem';
import OperationForm from './OperationForm';

export default function OperationsContainer(props) {

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
  const [operationsData, setOperationsData] = useState();
  const [refreshedPage, setRefreshedPage] = useState(false); 
  const [filterData, setFilterData] = useState(
    {
      title: "",
      type: "",
      remark: "",
    }
  ) 

  function refreshPage() {
    setRefreshedPage(prevState => !prevState)
  }

  // if modal is on when the first render occurs,
  // close modal is any is opened
  useEffect(() => {
    toggleModalOff();
  }, [])

  useEffect(() => {
    getData(`../../../data/project/${params.id}/operations/all`)
    if (fetchedData) {
      setOperationsData(fetchedData)
    }
  }, [operationsData, refreshedPage])


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
        handleFunction: () => deleteData(`../../../data/operations/delete/${item.projectOperationId}`),
        closeFunc: {toggleModalOff},
        obj: {...item}
      }})
      toggleModalOn();
  }

  const operationsArr = fetchedData && fetchedData.filter(item => {
    return (
      item.operationTitle.toString().includes(filterData.title.toString()) 
      && item.operationHourTypeName.toString().includes(filterData.type.toString())
      && item.remark.toString().includes(filterData.remark.toString())
    )
  })
  .map((item, index = 1) => {    
    const position = index + 1;
    return (
      <OperationItem
        key={item.projectOperationId}
        item={item}
        position={position}
        editItem={setEditModal}
        deleteItem={setDeleteModal}
        previousItemId={fetchedData[index -1] && fetchedData[index - 1].projectOperationId}
        nextItemId={fetchedData[index + 1] && fetchedData[index + 1].projectOperationId}
        operationsArrLength={fetchedData.length}
        refreshPage={refreshPage}
        isFirst={index === 0}
        isLast={index === fetchedData.length - 1}
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
            <MainContentContainerTitle title={"Operations"} />
            <div>
            <CtaButton 
                  title={`Add new operation`}
                  type="add"
                  variant="large"
                  handlingFunction={setAddModal}
                  refreshPage={refreshPage}
            /> 
            </div>
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItem variant='narrower' title={"Pos."} isFilterTitle />
              <MainContentHeaderContainerItem 
                variant='wide' 
                title={"Title"}
                type='text'
                inputName='title'
                handleChange={handleChange}
                value={filterData.title}
                showInputField
              />
              <MainContentHeaderContainerItem variant='narrower' title={"Quantity [hrs]"}
              />
              <MainContentHeaderContainerItem variant='narrower' title={"Price/hr [PLN]"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Total value [PLN]"} />
              <MainContentHeaderContainerItem 
                variant='narrower' 
                title={"Type"}
                type='text'
                inputName='type'
                handleChange={handleChange}
                value={filterData.type}
                showInputField
                 />
              <MainContentHeaderContainerItem
                variant='wide' 
                title={"Remark"} 
                type='text'
                inputName='remark'
                handleChange={handleChange}
                value={filterData.remark}
                showInputField
                />
              <MainContentHeaderCtaContainer />
            </MainContentHeaderContainer>
            <div className='rows__container'>
                {operationsArr}
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
        form={<OperationForm 
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
