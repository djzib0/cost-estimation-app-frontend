import React from 'react'
// styles imports
import '../../App.css'
// components import
import HorizontalDashboard from '../../headlessComponents/horizontalDashboard/index'
import MainContentHeader from '../mainContentHeader/MainContentHeader'
import MainContentHeaderLink from '../mainContentHeaderLink/MainContentHeaderLink'

export default function GradesDictionary() {
  return (
    <div className='main-content__container'>
      <HorizontalDashboard>
        <HorizontalDashboard.Title>
          <MainContentHeader title={"Material Grades"} />
        </HorizontalDashboard.Title>
        <HorizontalDashboard.Item>
          <MainContentHeaderLink pathTo="test" title={"List"}/>
          <MainContentHeaderLink pathTo="test" title={"List2"}/>
        </HorizontalDashboard.Item>
      </HorizontalDashboard>

    </div>
  )
}
