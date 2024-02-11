import React, { useState } from 'react'

function useDictionariesApi() {

  const [materialGrades, setMaterialGrades] = useState([]);
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

  async function addMaterialGrade(newMaterialGradeObj) {
    console.log(" adding in useDictionary")
    setLoading(true)
    fetch(`/data/materialgrades/add`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          euSymbol: "Test euSymbol",
          gerSymbol: "Test GerSymbol",
          materialGroup: "st. st."   
        })
    })
  }

  return {
    materialGrades,
    getMaterialGradesData,
    addMaterialGrade,
    loading,
    error
  }
  
}

export default useDictionariesApi
