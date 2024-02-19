import React, { useEffect, useState } from 'react'

function useFetch() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchUrl, setFetchUrl] = useState(null);
  const [options, setOptions] = useState({});


  useEffect(() => {
    async function fetchData(urlToFetch) {
    setIsLoading(true)
    fetch(urlToFetch)
    .then(res => {
      if (!res.ok) {
        throw {
          message: "test message, should be given from a server side",
          statusText: res.statusText,
          status: res.status
        }
      }
      return res.json()})
    .then(data => setData(data))
    .catch(err => setError(err))
    }

    if (fetchUrl !== null) {
      fetchData(fetchUrl)
    }

  }, [fetchUrl])

  async function updateUrl(newUrl) {
    console.log("updating url")
    newUrl && setFetchUrl(newUrl);
    
    console.log(fetchUrl, "fetchUrl")
    console.log(error && error.status, "error here")
  }

  return (
    {data, error, isLoading, updateUrl, setFetchUrl}
  )
}

export default useFetch


