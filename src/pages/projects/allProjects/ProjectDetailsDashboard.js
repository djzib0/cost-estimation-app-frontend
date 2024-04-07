import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
// contexts imports
import { DefaultSettingsContext } from '../../../App';
// components imports
import HorizontalDashboard from '../../../headlessComponents/horizontalDashboard/index'
import MainContentHeader from '../../../components/mainContentContainer/MainContentHeader'
// custom hooks imports
import useApi from '../../../customHooks/useApi';

export default function ProjectDetailsDashboard() {

  // utilize DefaultSettingsContext
  const {theme} = useContext(DefaultSettingsContext);
  const themeMode = `--${theme}`

  // utilize params
  const params = useParams();

  // utilize custom hooks
  const {
    getData,
    fetchedData
  } = useApi()

  // state variables
  const [projectData, setProjectData] = useState(
    {
      projectNumber:  "kjlk ",
      projectClientNumber: " "
    }
  );

  const [projectTitle, setProjecTitle] = useState("Project");

  // fetching project data
  useEffect(() => {
    getData(`/data/projects/${params.id}`)
  }, [])

  // setting projectData
  useEffect(() => {
    if (fetchedData) {
      setProjectData(fetchedData)
    }
  }, [fetchedData])

  // settings project title to display it on the page
  useEffect(() => {
    if (fetchedData) {
      setProjecTitle(`Project 
      ${projectData.projectNumber ? projectData.projectNumber : ""}/${projectData.projectClientNumber ? projectData.projectClientNumber : ""}`)
    }
  }, [projectData])

  return (
    <div className='main-content-dashboard__container'>
      <HorizontalDashboard>
        <HorizontalDashboard.Title>
          <MainContentHeader 
          title={projectTitle} />
        </HorizontalDashboard.Title>
        <HorizontalDashboard.Tabs>

          <NavLink 
            to={"."}
            end
            className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
            :`main-content-header__link${themeMode}`}
          >
              Summary
          </NavLink>

          <NavLink 
            to={"operations"}
            end
            className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
            :`main-content-header__link${themeMode}`}
          >
              Operations
          </NavLink>

          <NavLink 
            to={"plates"}
            end
            className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
            :`main-content-header__link${themeMode}`}
          >
              Plates
          </NavLink>

          <NavLink 
            to={"roundbars"}
            end
            className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
            :`main-content-header__link${themeMode}`}
          >
              Roundbars
          </NavLink>

          <NavLink 
            to={"othermaterials"}
            end
            className={({isActive}) => isActive ? `main-content-header__link${themeMode}--active`
            :`main-content-header__link${themeMode}`}
          >
              Other
          </NavLink>

        </HorizontalDashboard.Tabs>
      </HorizontalDashboard>
      <Outlet />
    </div>
  )
}
