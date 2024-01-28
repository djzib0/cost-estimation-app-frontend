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

  // useEffect(() => {
  //   async function getSettings(authUserId) {
  //     try {
  //       console.log("passed value " + authUserId)
  //       const data = await getSettingsData(authUserId)
  //       setSettings(data)
  //     } catch(err) {
  //       setError(err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   async function getUser() {
  //     setLoading(true)
  //     try {
  //       const data = await getUserData()
  //       setAuthUser(data)
  //     } catch(err) {
  //       setError(err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }; 
  // getUser();
  // getSettingsData()
  // }, [])

  useEffect(() => {
    fetch(`/data/users/${1}`)
    .then(res => res.json())
    .then(data => {
      setAuthUser(data)
      fetch(`/data/settings/user/${data.appUserId}`)
      .then(res => res.json())
      .then(settingsData => setSettings(settingsData))
    })
  }, [])

  console.log(authUser)
  console.log(settings)

  return (
    <div className="App">
      <AuthUserContext.Provider value={{authUser}}>
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
