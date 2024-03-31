import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../mainContentContainer/MainContentContainer';
import MainSectionContainer from '../mainContentContainer/MainSectionContainer';
import MainContentContainerTitle from '../mainContentContainer/MainContentContainerTitle';
import MainContentHeaderContainer from '../mainContentContainer/MainContentHeaderContainer';
import MainContentHeaderContainerItem from '../mainContentContainer/MainContentHeaderContainerItem';
// context imports
import { useParams } from 'react-router-dom';
import { DefaultSettingsContext } from '../../App';
import { ModalContext } from '../../App';
// custom hooks imports
import useApi from '../../customHooks/useApi';
import useModal from '../../customHooks/useModal';
// utilities imports
import { summarizeOperationsCost } from '../../utils/utils';

export default function SummaryContainer(props) {

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
  const [projectData, setProjectData] = useState([]);
  const [refreshedPage, setRefreshedPage] = useState(false);
  const [operationsData, setOperationsData] = useState([]);

  function refreshPage() {
    setRefreshedPage(prevState => !prevState)
  }

  useEffect(() => {
    getData(`/data/projects/${params.id}`)
  }, [refreshedPage])

  useEffect(() => {
    setOperationsData(fetchedData.operations)
  }, [fetchedData])

  // operations summary
  
  const operationsSummary = operationsData && summarizeOperationsCost(operationsData);
  const operationsSummaryArr = operationsSummary && operationsSummary.map((item) => {
    console.log(item[1])
    return (
        <div>
            {item[0]}
            <p>{item[1].hoursQuantity}</p>
            <p>{item[1].pricePerHr}</p>
        </div>
    )
  })
  
  return (
    <div>
      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
            <MainContentContainerTitle title={"Operations"} />
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItem variant='narrower' title={"Pos."} />
              <MainContentHeaderContainerItem variant='narrower' title={"Type"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Quantity"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Price/hr [PLN]"} />
              <MainContentHeaderContainerItem variant='narrower' title={"Total value [PLN]"} />
            </MainContentHeaderContainer>
            <div className='rows__container'>
                {operationsSummaryArr}
            </div>
          </div>
        </MainSectionContainer>
      </MainContentContainer>
      
    </div>
  )
}
