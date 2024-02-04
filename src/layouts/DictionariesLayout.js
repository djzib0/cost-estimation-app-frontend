import React from 'react'
import { Outlet } from 'react-router-dom'
// components imports
import DictionariesMenu from '../components/dictionaries/dictionariesMenu/DictionariesMenu'

export default function DictionariesLayout() {
  return (
    <div>
      <DictionariesMenu />
      <Outlet />
    </div>
  )
}
