import React, { useState } from 'react'

function useDictionariesApi() {

  const [materialGrades, setMaterialGrades] = useState([]);
  const [materialGroupTypes, setMaterialGroupTypes] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // fetching data from API
  async function getMaterialGradesData(materialGroup) {
    setLoading(true)
    fetch(`/data/materialgrades?group=${materialGroup}`)
    .then(res => {
      if (!res.ok) {
        throw {
          message: "Failed to fetch material grades data",
          statusText: res.statusText,
          status: res.status
        }
      }
      return res.json()})
    .then(data => setMaterialGrades(data))
    .catch(err => setError(err))
    .finally(setLoading(false))
  }

  async function getMaterialGroupTypes() {
    setLoading(true)
    fetch(`/data/materialgroups`)
    .then(res => {
      if (!res.ok) {
        throw {
          message: "Failed to fetch material group types.",
          statusText: res.statusText,
          status: res.status
        }
      }
      return res.json()})
    .then(data => setMaterialGroupTypes(data))
    .catch(err => setError(err))
    .finally(setLoading(false))
  }

  async function addMaterialGrade(newMaterialGradeObj) {
    fetch(`/data/materialgrades/add`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          ...newMaterialGradeObj 
        })
    })
  }

  async function editMaterialGrade(editedMaterialGrade) {
    fetch(`/data/materialgrades/edit`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          ...editedMaterialGrade 
        })
    })
  }

  async function deleteMaterialGrade(materialGradeId) {
    console.log("item deleted, id", materialGradeId)
    fetch(`/data/materialgrades/delete/${materialGradeId}`, {
      method: 'DELETE'
    })
    // .then(() => console.log("item deleted succesfully"))
  }

  return {
    materialGrades,
    getMaterialGradesData,
    addMaterialGrade,
    editMaterialGrade,
    deleteMaterialGrade,
    getMaterialGroupTypes,
    materialGroupTypes,
    loading,
    error
  }
  
}

export default useDictionariesApi
