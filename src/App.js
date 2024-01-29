import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
// components imports
import MainLayout from './components/layouts/MainLayout';
import Main from './components/main/Main';
import Settings from './components/settings/Settings';
// css import
import './App.css'

const AuthUserContext = createContext();
const ThemeContext = createContext();

export default function App() {

  const [authUser, setAuthUser] = useState();
  const [settings, setSettings] = useState();

  // fetching data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // fetch user data
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
      setAuthUser(data)
    })
    .catch(err => setError(err))
    .finally(setLoading(false))
  }, [])
  
  // fetch user settings data
  useEffect(() => {
    if (authUser) {
      fetch(`/data/settings/user/${authUser.appUserId}`)
      .then(res => res.json())
      .then(settingsData => setSettings(settingsData))
    }
  }, [authUser])

  // set styling to body element
  useEffect(() => {
    if (settings) {
      console.log("in body: " + settings.theme )
      document.body.classList.add(`body--${settings.theme}`)
    }
  }, [settings])
  
  // set default theme mode (light) if fetching goes wrong
  // pass it in ThemContext Provider
  const themeMode = settings ? `--${settings.theme}` : "--light";

  return (
    <div className="App">
      <AuthUserContext.Provider value={{authUser, loading, error}}>
        <ThemeContext.Provider value={{themeMode}}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Main />} />
              <Route path='/settings' element={<Settings />} />
            </Route>
          </Routes>
        </ThemeContext.Provider>
      </AuthUserContext.Provider>
    </div>
  );
}

export { AuthUserContext, ThemeContext } ;
