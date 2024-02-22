import React, { useContext } from 'react'
// styles imports
import '../../../App.css'
// components import
import HorizontalDashboard from '../../../headlessComponents/horizontalDashboard/index'
import MainContentHeader from '../../mainContentContainer/MainContentHeader'
import MainContentHeaderLink from '../../mainContentContainer/MainContentHeaderLink'
import { NavLink } from 'react-router-dom'
// context imports
import { ThemeContext } from '../../../App';

export default function GradesDictionaryDashboard() {

  const {theme} = useContext(ThemeContext);
  const themeMode = `--${theme}`

  return (
    <div className='main-content-dashboard__container'>
      <HorizontalDashboard>
        <HorizontalDashboard.Title>
          <MainContentHeader title={"Material Grades"} />
        </HorizontalDashboard.Title>
        <HorizontalDashboard.Tabs>

          <NavLink 
            to={"."}
            end
            className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
            :`main-content-header__link${themeMode}`}
          >
              Steel
          </NavLink>
          <NavLink 
            to={"stst"}
            end
            className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
            :`main-content-header__link${themeMode}`}
          >
              Stainless steel
          </NavLink>

          <NavLink 
            to={"aluminum"}
            end
            className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
            :`main-content-header__link${themeMode}`}
          >
              Aluminum
          </NavLink>

          <NavLink 
            to={"other"}
            end
            className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
            :`main-content-header__link${themeMode}`}
          >
              Other
          </NavLink>

        </HorizontalDashboard.Tabs>
      </HorizontalDashboard>
    </div>
  )
}
