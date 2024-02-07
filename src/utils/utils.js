function capitalFirstLetter(text) {
    return text.slice(0, 1).toUpperCase() + text.slice(1);
}

function getLocalStorageTheme() {
    const value = localStorage.getItem("theme");
    if (value) {
        return value
    } else {
        localStorage.setItem("theme", "light")
    }
}

function setLocalStorageTheme(key, value) {
    localStorage.setItem(key, value)
}

function isEmpty(input) {
    return input.length === 0;
}

export {getLocalStorageTheme, isEmpty}