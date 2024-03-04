import React, { useContext } from 'react';
// contexts imports
import { DefaultSettingsContext } from '../../App';
// styles imports
import './MainContentContainerTitle.css';

export default function MainContentContainerTitle({children, title}) {

  const {theme} =  useContext(DefaultSettingsContext);
  const themeMode = `--${theme}`;

  return (
    <h2 className={`main-content__container--title${themeMode}`}>
      {title}
    </h2>
  )
}
