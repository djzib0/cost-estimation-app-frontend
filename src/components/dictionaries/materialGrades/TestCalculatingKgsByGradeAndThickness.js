import React from 'react'

export default function TestCalculatingKgsByGradeAndThickness() {


  // remove this and replace with fetched data
  const materials = [
    {
        plateMaterialId: 1,
        dimensionA: 100.0,
        dimensionB: 200.0,
        thickness: 30.0,
        weight: 5.0,
        isPainted: true,
        isPaintedBothSides: false,
        surfaceToConserve: 0.0,
        projectId: 1,
        materialGrade: {
            materialGradeId: 1,
            euSymbol: "S235J2",
            gerSymbol: 1.0117,
            density: 8.0,
            gradeGroup: "steel"
        }
    },
    {
      plateMaterialId: 1,
      dimensionA: 100.0,
      dimensionB: 200.0,
      thickness: 30.0,
      weight: 5.0,
      isPainted: true,
      isPaintedBothSides: false,
      surfaceToConserve: 0.0,
      projectId: 1,
      materialGrade: {
          materialGradeId: 2,
          euSymbol: "S335J2",
          gerSymbol: 1.0117,
          density: 8.0,
          gradeGroup: "steel"
      }
    },
    {
      plateMaterialId: 1,
      dimensionA: 100.0,
      dimensionB: 200.0,
      thickness: 30.0,
      weight: 5.0,
      isPainted: true,
      isPaintedBothSides: false,
      surfaceToConserve: 0.0,
      projectId: 1,
      materialGrade: {
          materialGradeId: 2,
          euSymbol: "S335J2",
          gerSymbol: 1.0117,
          density: 8.0,
          gradeGroup: "steel"
      }
    },
    {
      plateMaterialId: 1,
      dimensionA: 100.0,
      dimensionB: 200.0,
      thickness: 40.0,
      weight: 5.0,
      isPainted: true,
      isPaintedBothSides: false,
      surfaceToConserve: 0.0,
      projectId: 1,
      materialGrade: {
          materialGradeId: 2,
          euSymbol: "S335J2",
          gerSymbol: 1.0117,
          density: 8.0,
          gradeGroup: "steel"
      }
    },
    {
      plateMaterialId: 1,
      dimensionA: 100.0,
      dimensionB: 200.0,
      thickness: 40.0,
      weight: 5.0,
      isPainted: true,
      isPaintedBothSides: false,
      surfaceToConserve: 0.0,
      projectId: 1,
      materialGrade: {
          materialGradeId: 2,
          euSymbol: "S335J2",
          gerSymbol: 1.0117,
          density: 8.0,
          gradeGroup: "steel"
      }
    },
  ]

  let dict = new Map();
 

  for (let material of materials) {
    const thickness = material.thickness;
    const euSymbol = material.materialGrade.euSymbol;
    // check if the pair is in the dictionary
    if (dict.has(thickness + " " + euSymbol)) {
      console.log("dict contains " + thickness + " " + euSymbol)
      // if dict contain a key, add weight to already existed value
      dict.set((thickness + " " + euSymbol), dict.get(thickness + " " + euSymbol) + material.weight)

    } else {
      // if dict doesn't contain a key, set new key with value 0, and add a weight
      dict.set((thickness + " " + euSymbol), 0)
      dict.set((thickness + " " + euSymbol), dict.get(thickness + " " + euSymbol) + material.weight)
    }
  }

  console.log(dict)
  const sumsArr = Array.from(dict).map(item => {
    return (<div>
      <p>{item[0]}</p>
      <p>{item[1]}kgs</p>
    </div>)
  })

  return (
    <div>
      {sumsArr}
    </div>
  )
}
