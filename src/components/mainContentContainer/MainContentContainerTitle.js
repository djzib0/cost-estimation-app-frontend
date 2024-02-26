import React, { useContext } from 'react';
// contexts imports
import { ThemeContext } from '../../App';
// styles imports
import './MainContentContainerTitle.css';

export default function MainContentContainerTitle({children, title}) {

  const {theme} =  useContext(ThemeContext);
  const themeMode = `--${theme}`;

  return (
    <h2 className={`main-content__container--title${themeMode}`}>
      {title}
    </h2>
  )
}
