import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
// components imports
import MainLayout from './layouts/MainLayout'
import Main from './components/main/Main';
import ProjectsLayout from './layouts/ProjectsLayout';
import SettingsLayout from './layouts/SettingsLayout';
import AllProjects from './pages/projects/allProjects/AllProjects';
import ProjectDetails from './pages/projects/allProjects/ProjectDetails';
import ProjectMaterials from './pages/projects/allProjects/ProjectMaterials';
import RoundbarMaterials from './pages/projects/allProjects/RoundbarMaterials';
import Dictionaries from './pages/dictionaries/Dictionaries';
import DictionariesLayout from './layouts/DictionariesLayout';
import MaterialGradesLayout from './layouts/MaterialGradesLayout';
import MaterialGrades from './pages/dictionaries/materialGrades/MaterialGrades';
import MaterialGradesStSt from './pages/dictionaries/materialGrades/MaterialGradesStSt';
import MaterialGradesAluminum from './pages/dictionaries/materialGrades/MaterialGradesAluminum';
import MaterialGradesOther from './pages/dictionaries/materialGrades/MaterialGradesOther';
import UnitsLayout from './layouts/UnitsLayout';
import OperationsContainer from './components/operation/OperationsContainer';
import UnitsContainer from './pages/dictionaries/units/UnitsContainer';
import OtherMaterials from './pages/projects/allProjects/OtherMaterials';
import ProjectOutsourcing from './pages/projects/allProjects/ProjectOutsourcing';
// css import
import './App.css'
// utils imports
import { getLocalStorageTheme } from './utils/utils';
import ProjectDetailsDashboard from './pages/projects/allProjects/ProjectDetailsDashboard';

const AuthUserContext = createContext();
const DefaultSettingsContext = createContext();
const ModalContext = createContext();


export default function App() {


  const [authUser, setAuthUser] = useState();
  const [settings, setSettings] = useState();
  const [theme, setTheme] = useState(getLocalStorageTheme())
  const [isModalOn, setIsModalOn] = useState(false)

  // state variable to refresh page
  const [refreshPage, setRefreshPage] = useState(false)

  function handleRefreshPage() {
    setRefreshPage(prevState => !prevState)
  }

  // change Modal state
  function toggleModalOn() {
    setIsModalOn(true);
  }

  function toggleModalOff() {
    setIsModalOn(false);
  }

  // fetching data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // if any modal is opened, close it when user goes to another
  // route/view
  useEffect(() => {
    toggleModalOff()
  }, [])

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
  
  return (
    <div className="App">
      <AuthUserContext.Provider value={{authUser, loading, error}}>
        <DefaultSettingsContext.Provider value={{settings, handleRefreshPage, theme, switchTheme}}>
          <ModalContext.Provider value={{isModalOn, toggleModalOn, toggleModalOff}}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Main />} />
                <Route path='settings' element={<SettingsLayout />}>
                  <Route path="Item1" element={<Main />} />
                  <Route path="Item2" element={<Main />} />
                </Route>

                <Route path='projects' element={<ProjectsLayout />} >
                  <Route path='allProjects' element={<AllProjects />} /> 
                  <Route path='details/:id' element={<ProjectDetailsDashboard />}>
                    <Route index element={<ProjectDetails />} />
                    <Route path='operations' element={<OperationsContainer />} />
                    <Route path='plates' element={<ProjectMaterials />} />
                    <Route path='roundbars' element={<RoundbarMaterials />} />
                    <Route path='othermaterials' element={<OtherMaterials />} />
                    <Route path='outsourcing' element={<ProjectOutsourcing />} />
                  </Route>
                </Route>

                <Route path='dictionaries' element={<DictionariesLayout />}>
                  <Route index element={<Dictionaries />} />
                  <Route path="gradesDictionary" element={<MaterialGradesLayout />}>
                    <Route index element={<MaterialGrades />} />
                    <Route path='stst' element={<MaterialGradesStSt />} />
                    <Route path='aluminum' element={<MaterialGradesAluminum />} />
                    <Route path='other' element={<MaterialGradesOther />} />
                  </Route>
                  <Route path="units" element={<UnitsLayout />}>
                    <Route index element={<UnitsContainer />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </ModalContext.Provider>
        </DefaultSettingsContext.Provider>
      </AuthUserContext.Provider>
    </div>
  );
}

export { AuthUserContext, DefaultSettingsContext, ModalContext} ;
