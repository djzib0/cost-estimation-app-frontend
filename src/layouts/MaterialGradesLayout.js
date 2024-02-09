import React from 'react';
import { Outlet } from 'react-router-dom';
import GradesDictionaryDashboard from '../components/dictionaries/materialGrades/MaterialGradesDashboard';

export default function MaterialGradesLayout() {
  return (
    <div>
        <GradesDictionaryDashboard />
        <Outlet/>
    </div>
  )
}
