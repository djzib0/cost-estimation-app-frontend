import React, { useContext, useEffect, useState } from 'react';
// custom hooks imports
import useModal from './useModal';
//contexts imports
import { ModalContext } from '../App';

function useApi() {

  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  
  // utilize ModalContext
  const {isModalOn, toggleModalOn, toggleModalOff} = useContext(ModalContext)


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

  async function addData(url, obj, errMsg) {
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          ...obj 
        })
    })
    .then(res => {
      if (!res.ok) {
        throw {
          message: errMsg,
          statusText: res.statusText,
          status: res.status
        }
      } else {
        toggleModalOff();
      }
    })
    .catch(err => {
      setFetchError(err);
    })
  }

  async function editData(url, obj, errMsg) {
    fetch(url, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          ...obj 
        })
    })
    .then(res => {
      if (!res.ok) {
        throw {
          message: errMsg,
          statusText: res.statusText,
          status: res.status
        }
      } else {
        toggleModalOff();
      }
    })
    .catch(err => {
      setFetchError(err);
    })
  }

  async function deleteData(url) {
    fetch(url , {
      method: 'DELETE'
    })
  }

  async function changeEntryPosition(url, editedItemPosition, SwitchedItemPosition, errMsg) {
    fetch(url, {
      method: 'PUT',
    })
  }


  return {
    fetchedData,
    loading,
    fetchError,
    getData,
    addData,
    editData,
    deleteData,
    changeEntryPosition
  }
}

export default useApi;