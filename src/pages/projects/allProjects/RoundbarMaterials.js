import React, { useContext, useEffect, useState } from 'react';
// components imports
import RoundbarsContainer from '../../../components/roundbarMaterial/RoundbarsContainer';
// contexts imports
import { useParams } from 'react-router-dom';
import { DefaultSettingsContext } from '../../../App';
import { ModalContext } from '../../../App';


export default function RoundbarMaterials() {

  // utilize DefaultSettingsContext
  const {theme} = useContext(DefaultSettingsContext)
  const themeMode = `--${theme}`

  // utilize ModalContext
  const {isModalOn, toggleModalOn, toggleModalOff} = useContext(ModalContext);

  // utilize params
  const params = useParams()

  // state variables
  const [projectData, setProjectData] = useState();
  const [refreshedPage, setRefreshedPage] = useState(false);
  

  function refreshPage() {
    setRefreshedPage(prevState => !prevState)
  }

  return (
    <div className='main-content__container'>
        <RoundbarsContainer projectId={params.id}/>
    </div>
  )
}
