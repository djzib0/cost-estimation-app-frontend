import React from 'react'
import { Outlet } from 'react-router-dom'

import SettingsMenu from '../pages/settings/settingsMenu/SettingsMenu';

export default function SettingsLayout() {
  return (
    <div>
        <SettingsMenu />
        <Outlet />
    </div>
  )
}
