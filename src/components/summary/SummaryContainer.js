import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../mainContentContainer/MainContentContainer';
import MainSectionContainer from '../mainContentContainer/MainSectionContainer';
import MainContentContainerTitle from '../mainContentContainer/MainContentContainerTitle';
import MainContentHeaderContainer from '../mainContentContainer/MainContentHeaderContainer';
import MainContentHeaderContainerItem from '../mainContentContainer/MainContentHeaderContainerItem';
import SummaryOperationItem from './SummaryOperationItem';
// context imports
import { useParams } from 'react-router-dom';
import { DefaultSettingsContext } from '../../App';
import { ModalContext } from '../../App';
// custom hooks imports
import useApi from '../../customHooks/useApi';
import useModal from '../../customHooks/useModal';
// utilities imports
import { summarizeOperationsCost, summarizePlateMaterials } from '../../utils/utils';

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

  function refreshPage() {
    setRefreshedPage(prevState => !prevState)
  }

  useEffect(() => {
    getData(`/data/projects/${params.id}`)
  }, [refreshedPage])

  useEffect(() => {
    setProjectData(fetchedData)
  }, [fetchedData])

  // operations summary
  let operationsTotalValue = 0;
  const operationsSummary = projectData && summarizeOperationsCost(fetchedData.operations);
  const operationsSummaryArr = operationsSummary && operationsSummary.map((item, index) => {
    const position = index + 1;
    operationsTotalValue += item[1].hoursQuantity * item[1].pricePerHr
    return (
        <SummaryOperationItem
          key={index}
          position={position}
          type={item[0]}
          quantity={item[1].hoursQuantity}
          pricePerHr={item[1].pricePerHr}
        />
    )
  })

  // materials summary
  let plateMaterialsTotalValue = projectData && summarizePlateMaterials(fetchedData.plateMaterials);
  // console.log(plateMaterialsTotalValue, " total value of plate materials")
  let roundbarMaterialsTotalValue = 0;

  
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
            <div className='total-value__container'>
              Total value: {operationsTotalValue},-
            </div>
          </div>
        </MainSectionContainer>
      </MainContentContainer>

      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
            <MainContentContainerTitle title={"Materials"} />
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItem variant='narrow' title={"Plates"} />
              <MainContentHeaderContainerItem variant='narrow' title={"Total value [PLN]"} />
            </MainContentHeaderContainer>
            <div className='rows__container'>
            </div>
            <div className='total-value__container'>
              {/* Total value: {plateMaterialsTotalValue},- */}
            </div>
          </div>
        </MainSectionContainer>
      </MainContentContainer>
    </div>
  )
}
