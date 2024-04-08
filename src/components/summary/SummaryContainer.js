import React, { useContext, useEffect, useState } from 'react'
// components imports
import MainContentContainer from '../mainContentContainer/MainContentContainer';
import MainSectionContainer from '../mainContentContainer/MainSectionContainer';
import MainContentContainerTitle from '../mainContentContainer/MainContentContainerTitle';
import MainContentHeaderContainer from '../mainContentContainer/MainContentHeaderContainer';
import MainContentHeaderContainerItem from '../mainContentContainer/MainContentHeaderContainerItem';
import SummaryOperationItem from './SummaryOperationItem';
import SummaryPlateMaterialsItem from './SummaryPlateMaterialsItem';
import SummaryRoundbarItem from './SummaryRoundbarItem';
import SummaryOtherItem from './SummaryOtherItem';
import SummaryResultItem from './SummaryResultItem';
// context imports
import { useParams } from 'react-router-dom';
import { DefaultSettingsContext } from '../../App';
import { ModalContext } from '../../App';
// custom hooks imports
import useApi from '../../customHooks/useApi';
import useModal from '../../customHooks/useModal';
// utilities imports
import { 
  summarizeOperationsCost,
  summarizePlateMaterials,
  summarizeRoundbarMaterials,
  summarizeOtherMaterials,
  formatValueToCurrency,
} from '../../utils/utils';
import OtherMaterialItem from '../otherMaterial/OtherMaterialItem';

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
  let plateMaterialsTotalValue = 0;
  let plateMaterialsSummary = projectData && summarizePlateMaterials(projectData.plateMaterials)


  // calculate gross weight of all plates in the project
  let allPlatesMaterialsTotalWeight = 0;
  plateMaterialsSummary && plateMaterialsSummary.map(item => {
    allPlatesMaterialsTotalWeight += item[1].totalWeight;
  })

  // create an array of plate item components
  const plateMaterialsSummaryArr = plateMaterialsSummary && plateMaterialsSummary.map((item, index) => {
    const position = index + 1;
    plateMaterialsTotalValue += item[1].totalValue
    return (
      <SummaryPlateMaterialsItem
        key={index}
        position={position}
        grade={item[0]}
        totalWeight={item[1].totalWeight}
        totalValue={item[1].totalValue}
        allPlatesMaterialsTotalWeight={allPlatesMaterialsTotalWeight}
      />
    )
  })
  
  // roundbars materials summary
  let roundbarMaterialsTotalValue = 0;
  let roundbarMaterialsTotalWeight = 0;
  let roundbarMaterialsSummary = projectData && summarizeRoundbarMaterials(projectData.roundbarMaterials)

  // calculate gross weight of all roundbars in the project
  let allRoundbarMaterialsTotalWeight = 0;
  roundbarMaterialsSummary && roundbarMaterialsSummary.map(item => {
    allRoundbarMaterialsTotalWeight += item[1].totalWeight;
  })

  // create an array of roundbar item components
  const roundbarMaterialsSummaryArr = roundbarMaterialsSummary && roundbarMaterialsSummary.map((item, index) => {
    roundbarMaterialsTotalValue += item[1].totalValue;
    roundbarMaterialsTotalWeight += item[1].totalWeight;
    return  (
      <SummaryRoundbarItem
        key={index}
        position={index + 1}
        grade={item[0]}
        totalWeight={item[1].totalWeight}
        totalValue={item[1].totalValue}
        allRoundbarMaterialsTotalWeight={allRoundbarMaterialsTotalWeight}
      />
    )
  })

  // other materials summary
  let otherMaterialsTotalValue = projectData && summarizeOtherMaterials(projectData.otherMaterials)


  return (
    <div>
      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
            <MainContentContainerTitle title={"Operations"} />
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItem variant='narrower' title={"Pos."} />
              <MainContentHeaderContainerItem variant='regular' title={"Type"} />
              <MainContentHeaderContainerItem variant='regular' title={"Quantity [hrs]"} />
              <MainContentHeaderContainerItem variant='regular' title={"Price/hr [PLN]"} />
              <MainContentHeaderContainerItem variant='regular' title={"Total value [PLN]"} />
            </MainContentHeaderContainer>
            <div className='rows__container'>
                {operationsSummaryArr}
            </div>
            <SummaryResultItem
              title={"Total value:"}
              value={formatValueToCurrency(operationsTotalValue)}
              suffix={",-"}
              isTop={true}
             />
          </div>
        </MainSectionContainer>
      </MainContentContainer>

      <MainContentContainer>
        <MainSectionContainer themeMode={themeMode}>
          <div className='data__container'>
            <MainContentContainerTitle title={"Plates"} />
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItem variant='narrower' title={"Pos."} />
              <MainContentHeaderContainerItem variant='regular' title={"Grade"} />
              <MainContentHeaderContainerItem variant='regular' title={"Total weight [kg]"} />
              <MainContentHeaderContainerItem variant='regular' title={"Total value [PLN]"} />
              <MainContentHeaderContainerItem variant='regular' title={"Gross weight share"} />
            </MainContentHeaderContainer>
            <div className='rows__container'>
              {plateMaterialsSummaryArr}
            </div>

            <MainContentContainerTitle title={"Roundbars"} />
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItem variant='narrower' title={"Pos."} />
              <MainContentHeaderContainerItem variant='regular' title={"Grade"} />
              <MainContentHeaderContainerItem variant='regular' title={"Total weight [kg]"} />
              <MainContentHeaderContainerItem variant='regular' title={"Total value [PLN]"} />
              <MainContentHeaderContainerItem variant='regular' title={"Gross weight share"} />
            </MainContentHeaderContainer>
            <div className='rows__container'>
              {roundbarMaterialsSummaryArr}
            </div>

            <MainContentContainerTitle title={"Other materials"} />
            <MainContentHeaderContainer>
              <MainContentHeaderContainerItem variant='narrower' title={"Pos."} />
              <MainContentHeaderContainerItem variant='regular' title={"Name"} />
              <MainContentHeaderContainerItem variant='regular' title={"Total weight [kg]"} />
              <MainContentHeaderContainerItem variant='regular' title={"Total value [PLN]"} />
            </MainContentHeaderContainer>
            <div className='rows__container'>
              <SummaryOtherItem 
                position={1}
                name={"Other materials"}
                otherMaterialsTotalValue={otherMaterialsTotalValue}
              />
            </div>

            <SummaryResultItem
              title={"Total value:"}
              value={formatValueToCurrency(roundbarMaterialsTotalValue)}
              suffix={",-"}
              isTop={true}
             />
            <SummaryResultItem
              title={"Material margin:"}
              value={projectData.materialMargin}
              suffix={"%"}
            />
            <SummaryResultItem
              title={"Total value with margin:"}
              value={formatValueToCurrency(roundbarMaterialsTotalValue * (1 + projectData.materialMargin / 100))}
              suffix={",-"}
            />
          </div>

        </MainSectionContainer>
      </MainContentContainer>

    </div>
  )
}
