import React, { useContext, useEffect, useState} from 'react';
// components imports
import MainContentContainer from '../mainContentContainer/MainContentContainer';
import MainSectionContainer from '../mainContentContainer/MainSectionContainer';
import MainContentContainerTitle from '../mainContentContainer/MainContentContainerTitle';
import MainContentHeaderContainer from '../mainContentContainer/MainContentHeaderContainer';
import MainContentHeaderContainerItem from '../mainContentContainer/MainContentHeaderContainerItem';
import Modal from '../modal/Modal';
import CtaButton from '../buttons/CtaButton';
import OtherMaterialItem from './OtherMaterialItem';
// context imports
import { useParams } from 'react-router-dom';
import { DefaultSettingsContext } from '../../App';
import { ModalContext } from '../../App';
// custom hooks imports
import useApi from '../../customHooks/useApi';
import useModal from '../../customHooks/useModal';

export default function OtherMaterialsContainer() {

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
  const [otherMaterialsData, setOtherMaterialsData] = useState([]);
  const [refreshedPage, setRefreshedPage] = useState(false);


  // if modal is on when the first render occurs,
  // close modal is any is opened
  useEffect(() => {
    toggleModalOff();
  }, [])

  useEffect(() => {
    getData(`../../../data/project/${params.id}/materials/other`)
    if (fetchedData) {
      setOtherMaterialsData(fetchedData)
    }
  }, [otherMaterialsData, refreshedPage])

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
          plateMaterialId: "",
          materialGradeId: "",
          materialGrade: "",
        }
      }})
    toggleModalOn();
  }

  const otherMaterialsArr = otherMaterialsData && fetchedData.map((item, index) => {
    console.log(item)
    return (
      <OtherMaterialItem 
        key={item.otherMaterialId}
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
              <MainContentHeaderContainerItem variant='regular' title={"Price/unit"} />
              <MainContentHeaderContainerItem variant='regular' title={"Total value"} />
              <MainContentHeaderContainerItem variant='regular' title={"Remark"} />
            </MainContentHeaderContainer>
              <div className='rows__container'>
                {otherMaterialsArr}
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
        // form={<PlateMaterialForm 
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
