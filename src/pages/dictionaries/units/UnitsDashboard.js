import React, { useContext, useEffect, useState } from 'react';
// styles imports
import '../../../App.css'
// components import
import HorizontalDashboard from '../../../headlessComponents/horizontalDashboard/index'
import MainContentHeader from '../../../components/mainContentContainer/MainContentHeader'
import MainContentHeaderLink from '../../../components/mainContentContainer/MainContentHeaderLink'
import { NavLink } from 'react-router-dom'
//context imports 
import { DefaultSettingsContext } from '../../../App';

export default function UnitsDashboard() {


  // utilize settings context
  const {theme} = useContext(DefaultSettingsContext)
  const themeMode = `--${theme}`

  return (
    <div className='main-content-dashboard__container'>
      <HorizontalDashboard>
        <HorizontalDashboard.Title>
          <MainContentHeader title={"Units"} />
        </HorizontalDashboard.Title>
        <HorizontalDashboard.Tabs>
          
        </HorizontalDashboard.Tabs>
      </HorizontalDashboard>
    </div>
  )
}
