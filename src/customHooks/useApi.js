import React, { useEffect, useState } from 'react';
// custom hooks imports
import useModal from './useModal';

function useApi() {

  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  async function getData(url) {
    setLoading(true)
    fetch(url)
    .then(res => {
      if (!res.ok) {
        throw {
          message: "Failed to fetch data",
          statusText: res.statusText,
          status: res.status
        }
      }
      return res.json()})
    .then(data => {
      setFetchedData(data)
      setIsFetched(true)
    })
    .catch(err => setFetchError(err))
    .finally(setLoading(false))
  }


  return {
    fetchedData,
    loading,
    fetchError,
    getData,
  }
}

export default useApi;