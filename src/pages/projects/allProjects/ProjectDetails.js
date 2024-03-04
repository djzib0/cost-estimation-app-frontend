import React, { useContext, useEffect, useState } from 'react';
// components imports
import MainContentContainer from '../../../components/mainContentContainer/MainContentContainer';
import MainContentContainerTitle from '../../../components/mainContentContainer/MainContentContainerTitle';
import MainContentHeaderContainer from '../../../components/mainContentContainer/MainContentHeaderContainer';
import MainContentHeaderContainerItemNarrow from '../../../components/mainContentContainer/MainContentHeaderContainerItemNarrow';
import MainSectionContainer from '../../../components/mainContentContainer/MainSectionContainer';
import PlateMaterialItem from '../../../components/plateMaterial/PlateMaterialItem';
import Modal from '../../../components/modal/Modal';
import PlateMaterialForm from '../../../components/plateMaterial/PlateMaterialForm';
// contexts imports
import { useParams } from 'react-router-dom';
import { DefaultSettingsContext } from '../../../App';
import { ModalContext } from '../../../App';
// custom hooks imports
import useApi from '../../../customHooks/useApi';
import useModal from '../../../customHooks/useModal';

export default function ProjectDetails() {

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
    getData
  } = useApi()

  const params = useParams()

  // state variables
  const [projectData, setProjectData] = useState();
  const [refreshedPage, setRefreshedPage] = useState(false);
  

  useEffect(() => {
    getData(`/data/projects/${params.id}`)
    if (fetchedData) {
      setProjectData(fetchedData)
    }
  }, [projectData])

  function refreshPage() {
    setRefreshedPage(prevState => !prevState)
  }

  // TODO - mapping plate materials (move to project Materials component!!)
  const projectDataArr = fetchedData.plateMaterials && fetchedData.plateMaterials.map(item => {
      return (
        <PlateMaterialItem 
          key={item.plateMaterialId} 
          item={item} 
          position={1}
          />
      )
    })


  return (
    <div className='main-content__container'>
      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
          <MainContentContainerTitle title={"Plates"} />
            Tutaj ma być tylko summary, przenieść detale materiałów do Materials
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItemNarrow title={"Pos."} />
              <MainContentHeaderContainerItemNarrow title={"Dim. A [mm]"} />
              <MainContentHeaderContainerItemNarrow title={"Dim. B [mm]"} />
              <MainContentHeaderContainerItemNarrow title={"Thick. [mm]"} />
              <MainContentHeaderContainerItemNarrow title={"Weight [kg]"} />
              <MainContentHeaderContainerItemNarrow title={"Grade"} />
              <MainContentHeaderContainerItemNarrow title={"Painted?"} />
              <MainContentHeaderContainerItemNarrow title={"Both sides?"} />
              <MainContentHeaderContainerItemNarrow title={"Area [m2]"} />
            </MainContentHeaderContainer>
              <div className='rows__container'>
                {projectDataArr}

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
        form={<PlateMaterialForm 
          obj={modalData.obj} 
          type={modalData.modalType}
          refreshPage={refreshPage}
          closeModal={toggleModalOff}
          />}
        />}
    </div>
  )
}
