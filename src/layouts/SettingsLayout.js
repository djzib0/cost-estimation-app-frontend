import React from 'react'
import { Outlet } from 'react-router-dom'
import SettingsMenu from '../components/settingsMenu/SettingsMenu'

export default function SettingsLayout() {
  return (
    <div>
        <SettingsMenu />
        <Outlet />
    </div>
  )
}
