export async function getUserData() {
 
     const res = await fetch(`/data/users/${1}`)
     if (!res.ok) {
         throw {
             message: "Failed to fetch users",
             statusText: res.statusText,
             status: res.status
         }
     };
     const data = await res.json();
     return data;
 }

 export async function getSettingsData(appUserId) {
    const res = await fetch(`/data/settings/user/${appUserId}`)
    if (!res.ok) {
        throw {
            message: "Failed to fetch settings",
            statusText: res.statusText,
            status: res.status
        }
    };
    const settingsData = await res.json();
    return settingsData;
 }