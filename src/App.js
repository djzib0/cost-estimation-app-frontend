import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
// components imports
import MainLayout from './layouts/MainLayout'
import Main from './components/main/Main';
import SettingsLayout from './layouts/SettingsLayout';
import Settings from './components/settings/Settings';
import Dictionaries from './components/dictionaries/Dictionaries';
import DictionariesLayout from './layouts/DictionariesLayout';
import GradesDictionary from './components/dictionaries/gradesDictionaryDashboard/GradesDictionaryDashboard';
import MaterialGradesLayout from './layouts/MaterialGradesLayout';
import MaterialGrades from './components/dictionaries/materialGrades/MaterialGrades';
import TestComponent from './components/testComponent/TestComponent';
// css import
import './App.css'
// utils imports
import { getLocalStorageTheme } from './utils/utils';
import GradesDictionaryDashboard from './components/dictionaries/gradesDictionaryDashboard/GradesDictionaryDashboard';


const AuthUserContext = createContext();
const ThemeContext = createContext();


export default function App() {


  const [authUser, setAuthUser] = useState();
  const [settings, setSettings] = useState();
  const [theme, setTheme] = useState(getLocalStorageTheme())

  // state variable to refresh page
  const [refreshPage, setRefreshPage] = useState(false)

  function handleRefreshPage() {
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
      .then(res =>  {
        if (!res.ok) {
          throw {
            message: "Failed to fetch settings",
            statusText: res.statusText,
            status: res.status
          }
        }
        return res.json()})
      .then(settingsData => setSettings(settingsData))
      .catch(err => console.log(err.message))
    }
  }, [authUser])

  // set styling to body element
  useEffect(() => {
        setTheme(prevTheme => localStorage.getItem("theme"))
        // remove all other styles from classList
        document.body.classList.remove(...document.body.classList)
        // set new style with theme from localStorage
        document.body.classList.add(`body--${getLocalStorageTheme("theme")}`)
  }, [theme])

  // function to switch theme
  function switchTheme() {
    const newTheme = getLocalStorageTheme("theme") === 'light' ? localStorage.setItem("theme", "dark") : localStorage.setItem("theme", "light")
    setTheme(getLocalStorageTheme("theme"))
  }

  console.log(authUser)
  console.log("theme: " + JSON.stringify(theme))

  return (
    <div className="App">
      <AuthUserContext.Provider value={{authUser, loading, error}}>
        <ThemeContext.Provider value={{settings, handleRefreshPage, theme, switchTheme}}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Main />} />
              <Route path='settings' element={<SettingsLayout />}>
                <Route path="Item1" element={<Main />} />
                <Route path="Item2" element={<Main />} />
              </Route>
              <Route path='dictionaries' element={<DictionariesLayout />}>
                <Route index element={<Dictionaries />} />
                <Route path="gradesdictionary" element={<MaterialGradesLayout />}>
                  <Route index element={<MaterialGrades />} />
                  <Route path='testpath' element={<TestComponent />} />
                </Route>
              </Route>

            </Route>
          </Routes>
        </ThemeContext.Provider>
      </AuthUserContext.Provider>
    </div>
  );
}

export { AuthUserContext, ThemeContext } ;
