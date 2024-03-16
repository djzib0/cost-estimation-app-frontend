import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../mainContentContainer/MainContentContainer';
import MainSectionContainer from '../mainContentContainer/MainSectionContainer';
import MainContentContainerTitle from '../mainContentContainer/MainContentContainerTitle';
import MainContentHeaderContainer from '../mainContentContainer/MainContentHeaderContainer';
import MainContentHeaderContainerItemNarrow from '../mainContentContainer/MainContentHeaderContainerItemNarrow';
import Modal from '../modal/Modal';
import CtaButton from '../buttons/CtaButton';
import MainContentHeaderContainerItem from '../mainContentContainer/MainContentHeaderContainerItem';
import MainContentHeaderContainerItemNarrower from '../mainContentContainer/MainContentHeaderContainerItemNarrower';
// context imports
import { useParams } from 'react-router-dom';
import { DefaultSettingsContext } from '../../App';
import { ModalContext } from '../../App';
// custom hooks imports
import useApi from '../../customHooks/useApi';
import useModal from '../../customHooks/useModal';
import RoundbarMaterialItem from '../roundbarMaterial/RoundbarMaterialItem';

export default function RoundbarsContainer(props) {

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
  const [roundbarsData, setRoundbarsData] = useState();
  const [refreshedPage, setRefreshedPage] = useState(false);

  function refreshPage() {
    setRefreshedPage(prevState => !prevState)
  }

  useEffect(() => {
    getData(`../../../data/project//${params.id}/materials/roundbar`)
    if (fetchedData) {
      setRoundbarsData(fetchedData)
    }
  }, [roundbarsData, refreshedPage])

  const positionCounter = 0
  const roundbarsDataArr = fetchedData && fetchedData.map((item, index = 1 )=> {
    return (
      <RoundbarMaterialItem
        key={item.roundbarMaterialId} 
        item={item} 
        position={index + 1}
        // materialGradeId={item.materialGrade.materialGradeId}
        // editItem={setEditModal}
        // deleteItem={setDeleteModal}
        />
    )
  })

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
        handleFunction: () => deleteData(`../../../data/materials/platematerial/delete/${item.plateMaterialId}`),
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
            <MainContentContainerTitle title={"Round bars"} />
            <div>
            <CtaButton 
                  title={`Add new round bar`}
                  type="add"
                  variant="large"
                  handlingFunction={setAddModal}
                  refreshPage={refreshPage}
            /> 
            </div>
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItemNarrower title={"Pos."} />
              <MainContentHeaderContainerItemNarrower title={"Diameter [mm]"} />
              <MainContentHeaderContainerItemNarrower title={"Length [mm]"} />
              <MainContentHeaderContainerItemNarrower title={"Weight [kg]"} />
              <MainContentHeaderContainerItemNarrower title={"Weight/m [kg]"} />
              <MainContentHeaderContainerItemNarrower title={"Quantity"} />
              <MainContentHeaderContainerItemNarrower title={"Weight total [kg]"} />
              <MainContentHeaderContainerItemNarrower title={"Grade"} />
              <MainContentHeaderContainerItemNarrower title={"Painted?"} />
              <MainContentHeaderContainerItemNarrower title={<>Area [m<sup>2</sup>]</>} />
              <MainContentHeaderContainerItemNarrower title={"Remark"} />
            </MainContentHeaderContainer>
              <div className='rows__container'>
                {roundbarsDataArr}
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
