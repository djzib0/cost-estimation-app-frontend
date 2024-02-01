import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
// components imports
import MainLayout from './layouts/MainLayout'
import Main from './components/main/Main';
import Settings from './components/settings/Settings';
// css import
import './App.css'

const AuthUserContext = createContext();
const ThemeContext = createContext();

export default function App() {

  const [authUser, setAuthUser] = useState();
  const [settings, setSettings] = useState();
  const [theme, setTheme] = useState("light");

  // refreshing page
  const [refreshPage, setRefreshPage] = useState(false)

  function handleRefreshPage() {
    console.log("refreshing mutterpacker")
    setRefreshPage(prevState => !prevState)
  }

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
  }, [refreshPage])
  
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
        // remove all other styles from classList
        document.body.classList.remove(...document.body.classList)
        // set new style
        document.body.classList.add(`body--${theme}`)
      }
  }, [settings])

  // function to switch theme
  function switchTheme() {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="App">
      <AuthUserContext.Provider value={{authUser, loading, error}}>
        <ThemeContext.Provider value={{settings, handleRefreshPage, theme, switchTheme}}>
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
