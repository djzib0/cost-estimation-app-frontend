import React, { useState } from 'react'

function useDictionariesApi() {

  const [materialGrades, setMaterialGrades] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // fetching data from API
  async function getMaterialGradesData() {
    setLoading(true)
    fetch(`/data/materialgrades`)
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

  return {
    materialGrades,
    getMaterialGradesData,
    loading,
    error
  }
  
}

export default useDictionariesApi
