import React, { useContext } from 'react';
//components imports
import CtaButton from '../../../components/buttons/CtaButton';
//context imports
import { DefaultSettingsContext } from '../../../App';
import { ModalContext } from '../../../App';
import { Link } from 'react-router-dom';
//styles imports

export default function ProjectDetailItem(props) {

  // utlizie Theme Context 
  const {theme} = useContext(DefaultSettingsContext);
  const themeMode = `--${theme}`

  //utilize Modal Context 
  const {
    isModalOn,
    toggleModalOn,
    toggleModalOff
  } = useContext(ModalContext);

  const {
    projectId,
    projectNumber,
    projectClientNumber
  } = props.item;


  return (
    <div className={`row__container${themeMode}`}>
        <div className='cell__container--narrow'>{projectId}</div>
        <div className='cell__container'>{projectNumber}</div>
        <div className='cell__container'>{projectClientNumber}</div>
        <div className='cell-cta__container'>
          <CtaButton 
                  title="edit"
                  type="edit"
                  variant="medium"
                  handlingFunction={() => props.editItem(projectId)}
          />
          <Link to={`../details/${projectId}`}>
          <CtaButton 
                  title="open"
                  type="open"
                  variant="medium"
                  />
          </Link>

          <CtaButton 
                  title="delete"
                  type="delete"
                  variant="medium"
                  handlingFunction={() => props.deleteItem(projectId)}
          />
        </div>
    </div>
  )
}
