import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
// components imports
import MainLayout from './components/layouts/MainLayout';
import Main from './components/main/Main';
import Settings from './components/settings/Settings';
// import api
import { getUserData, getSettingsData } from './api';

const AuthUserContext = createContext();

export default function App() {

  const [authUser, setAuthUser] = useState();
  const [settings, setSettings] = useState();

  // fetching data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  
  useEffect(() => {
    setLoading(true)
    fetch(`/data/users/${1}`)
    .then(res =>  {
      if (!res.ok) {
        throw {
          message: "Failed to fetch users",
          statusText: res.statusText,
          status: res.status
        }
      }
      return res.json()})
    .then(data => {
      console.log(data  + " data")
      setAuthUser(data)
    })
    .catch(err => setError(err))
    .finally(setLoading(false))
  }, [])
  
  useEffect(() => {
    if (authUser) {
      fetch(`/data/settings/user/${authUser.appUserId}`)
      .then(res => res.json())
      .then(settingsData => setSettings(settingsData))
    }
  }, [authUser])
  
  console.log(settings)
  return (
    <div className="App">
      <AuthUserContext.Provider value={{authUser, loading, error}}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Main />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Routes>
      </AuthUserContext.Provider>
    </div>
  );
}

export { AuthUserContext } ;
