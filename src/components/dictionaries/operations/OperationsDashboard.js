import React, { useContext } from 'react'
// styles imports
import '../../../App.css'
// components import
import HorizontalDashboard from '../../../headlessComponents/horizontalDashboard/index'
import MainContentHeader from '../../mainContentHeader/MainContentHeader'
import MainContentHeaderLink from '../../mainContentHeaderLink/MainContentHeaderLink'
import { NavLink } from 'react-router-dom'
//context imports 
import { ThemeContext } from '../../../App';

export default function OperationsDashboard() {

  const {theme} = useContext(ThemeContext)
  const themeMode = `--${theme}`

  return (
    <div className='main-content-dashboard__container'>
      <HorizontalDashboard>
        <HorizontalDashboard.Title>
          <MainContentHeader title={"Steel pipes"} />
        </HorizontalDashboard.Title>
        <HorizontalDashboard.Tabs>

        <NavLink 
          to={"."}
          end
          className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
          :`main-content-header__link${themeMode}`}
        >
          Assembly
        </NavLink>
        <NavLink 
          to={"welding"}
          end
          className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
          :`main-content-header__link${themeMode}`}
        >
          Welding
        </NavLink>
        <NavLink 
          to={"machining"}
          end
          className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
          :`main-content-header__link${themeMode}`}
        >
          Machining
        </NavLink>
        <NavLink 
          to={"surfaceConservation"}
          end
          className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
          :`main-content-header__link${themeMode}`}
        >
          Surface Conservation
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