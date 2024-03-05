import React from 'react';
import SettingsMenu from '../settingsMenu/SettingsMenu';
import { Outlet } from 'react-router-dom';

export default function Settings() {
  return (
    <div>
      <SettingsMenu />
    </div>
  )
}
