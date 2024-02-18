import React, { useEffect, useState } from 'react'

function useFetch() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [options, setOptions] = useState({});


  useEffect(() => {
    async function fetchData() {
    setIsLoading(true)
    fetch(url)
    .then(res => {
      if (!res.ok) {
        throw {
          message: "Failed to fetch material group types.",
          statusText: res.statusText,
          status: res.status
        }
      }
      return res.json()})
    .then(data => setData(data))
    .catch(err => setError(err))
    }
    if (url !== null) {
      fetchData()
    }
  }, [url])

  function updateUrl(newUrl) {
    setUrl(newUrl)
  }


  return (
    {data, error, isLoading, updateUrl}
  )
}

export default useFetch


