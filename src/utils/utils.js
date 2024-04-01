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

    if (data) {
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
    }
    
    return Array.from(operationsDict)
}

function summarizePlateMaterials(data) {
    let materialsDic = new Map();
    if (data) {
        for (let material of data) {
            const materialGradeName = material.materialGrade
        // check if the key is in the dictionary
        // if dict contains a key, add total value of selected materials
        // to already existed total value
        if (materialsDic.has(materialGradeName)) {
            let obj = materialsDic.get(materialGradeName)
            console.log("obj", obj)
            materialsDic.set(
                materialGradeName,
                {
                    ...obj,
                    totalValue: obj.totalValue + material.totalValue,
                    totalWeight: obj.totalWeight + material.totalWeight
                })
                // materialsDic.get(materialGradeName) + material.totalValue)
        } else {
            let obj = {
                totalValue: 0,
                totalWeight: 0
            }
            // if dict doesn't contain a key, set a new key with value 0
            materialsDic.set(materialGradeName, 0);
            materialsDic.set(
                materialGradeName,
                {
                    ...obj,
                    totalValue: material.totalValue,
                    totalWeight: material.totalWeight
                }
                )
        }
        }
    }
    console.log(materialsDic)
    return Array.from(materialsDic)
}


export {
    capitalFirstLetter, getLocalStorageTheme, isEmpty, isEqualZero,
    summarizeOperationsCost, summarizePlateMaterials
}