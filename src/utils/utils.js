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

function isEqualZero(input) {
    return Number(input) === 0;
}

// SUMMARIZE PROJECT COST
// operations summary
function summarizeOperationsCost(data) {
    let operationsDict = new Map();

    for (let operation of data) {
        const operationType = operation.operationHourTypeName;
        const quantity = operation.quantity;
        const pricePerHr = operation.operationPricePerHour;
        // check if the key is in the dictionary
        if (operationsDict.has(operationType)) {
            // if dict contains a key, add hours quantity to already existed value
            let obj = operationsDict.get(operationType);
            operationsDict.set(operationType, 
                {
                    ...obj,
                    hoursQuantity: obj.hoursQuantity + quantity
                })
        } else {
            // if dict doesn't contain a key, set a new key with value 0
            let obj = {
                hoursQuantity: 0,
                pricePerHr: pricePerHr
            }
            operationsDict.set(operationType, obj)
            // and then add the hours quantity
            operationsDict.set(operationType,
                {
                    ...obj,
                    hoursQuantity: quantity
                })
        }
    }

    return Array.from(operationsDict)
}


export {
    capitalFirstLetter, getLocalStorageTheme, isEmpty, isEqualZero,
    summarizeOperationsCost
}