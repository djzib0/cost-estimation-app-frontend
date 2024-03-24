import React, { useContext, useEffect, useState } from 'react'
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
import ProjectDetailItem from '../../pages/projects/allProjects/ProjectDetailsItem';
import OperationItem from '../operation/OperationItem';

export default function OperationsContainer() {

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

  function refreshPage() {
    setRefreshedPage(prevState => !prevState)
  }

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

  const operationsArr = fetchedData && fetchedData.map((item, index = 1) => {    
    console.log(item, "item")
    return (
      <OperationItem
        key={item.projectOperationId}
        item={item}
        position={index + 1}
        
      />
    )
  })


  return (
    <div>
      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
            <MainContentContainerTitle title={"Round bars"} />
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
              <MainContentHeaderContainerItem variant='narrower' title={"Pos."} />
              <MainContentHeaderContainerItem variant='narrower' title={"Title"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Quantity [hrs]"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Price/hr [PLN]"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Total value [PLN]"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Type"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Remark"} />
            </MainContentHeaderContainer>
              <div className='rows__container'>
                {operationsArr}
            </div>
          </div>
        </MainSectionContainer>
      </MainContentContainer>
    </div>
  )
}
