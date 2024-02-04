import React from 'react'
// styles imports
import '../../../App.css'
// components import
import HorizontalDashboard from '../../../headlessComponents/horizontalDashboard/index'
import MainContentHeader from '../../mainContentHeader/MainContentHeader'
import MainContentHeaderLink from '../../mainContentHeaderLink/MainContentHeaderLink'
import { NavLink } from 'react-router-dom'

export default function GradesDictionaryDashboard() {
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
            className={({isActive}) => isActive ? `main-content-header__link--dark--active`
            :`main-content-header__link`}
          >
              Test
          </NavLink>
          <NavLink 
            to={"testpath"}
            className={({isActive}) => isActive ? `main-content-header__link--dark--active`
            :`main-content-header__link`}
          >
              Test 2
          </NavLink>
        </HorizontalDashboard.Tabs>
      </HorizontalDashboard>
    </div>
  )
}
