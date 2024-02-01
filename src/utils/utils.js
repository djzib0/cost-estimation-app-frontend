function capitalFirstLetter(text) {
    return text.slice(0, 1).toUpperCase() + text.slice(1);
}

function getLocalStorageTheme(key) {
    const value = localStorage.getItem(key);
    if (value) {
        return value
    } else {
        localStorage.setItem("theme", "light")
    }
}

function setLocalStorageTheme(key, value) {
    localStorage.setItem(key, value)
}

export {getLocalStorageTheme}