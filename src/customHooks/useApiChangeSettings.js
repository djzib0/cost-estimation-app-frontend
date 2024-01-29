import React, { useEffect, useState} from 'react'

function useApiChangeSettings() {

  const [refresh, setRefresh] = useState(false)

  function changeSettingsTheme(settingObj) {
    async function editEntry(id) {
      fetch(`data/settings/${settingObj.settingId}`, {
        method: "PUT",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          ...settingObj,
          theme: settingObj.theme.toLowerCase() ==='light' ? 'dark' : 'light'
        })
      })
    }
    editEntry();
  }

  return {changeSettingsTheme}
}

export default useApiChangeSettings


