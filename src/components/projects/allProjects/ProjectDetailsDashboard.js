import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
// contexts imports
import { ThemeContext } from '../../../App';
// components import
import HorizontalDashboard from '../../../headlessComponents/horizontalDashboard/index'
import MainContentHeader from '../../mainContentContainer/MainContentHeader'
import MainContentHeaderLink from '../../mainContentContainer/MainContentHeaderLink'

export default function ProjectDetailsDashboard() {

  const {theme} = useContext(ThemeContext);
  const themeMode = `--${theme}`
  
  return (
    <div className='main-content-dashboard__container'>
      <HorizontalDashboard>
        <HorizontalDashboard.Title>
          <MainContentHeader title={"Project"} />
        </HorizontalDashboard.Title>
        <HorizontalDashboard.Tabs>

          <NavLink 
            to={"."}
            end
            className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
            :`main-content-header__link${themeMode}`}
          >
              Summary
          </NavLink>

          <NavLink 
            to={"materials"}
            end
            className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
            :`main-content-header__link${themeMode}`}
          >
              Materials
          </NavLink>

        </HorizontalDashboard.Tabs>
      </HorizontalDashboard>
    </div>
  )
}
