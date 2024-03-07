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
import PlatesContainer from '../../../components/platesContainer/PlatesContainer';
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
  

  // useEffect(() => {
  //   getData(`/data/projects/${params.id}`)
  //   if (fetchedData) {
  //     setProjectData(fetchedData)
  //   }
  // }, [projectData])

  function refreshPage() {
    setRefreshedPage(prevState => !prevState)
  }

  // TODO - mapping plate materials (move to project Materials component!!)
  // const projectDataArr = fetchedData.plateMaterials && fetchedData.plateMaterials.map(item => {
  //     return (
  //       <PlateMaterialItem 
  //         key={item.plateMaterialId} 
  //         item={item} 
  //         position={1}
  //         />
  //     )
  //   })


  return (
    <div className='main-content__container'>
        <PlatesContainer />
    </div>
  )
}
