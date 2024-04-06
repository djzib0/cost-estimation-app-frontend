import React from 'react';
import { Outlet } from 'react-router-dom';
// components imports
import UnitsDashboard from '../pages/dictionaries/units/UnitsDashboard';

export default function UnitsLayout() {
  return (
    <div>
      <UnitsDashboard />
      <Outlet />
    </div>
  )
}
