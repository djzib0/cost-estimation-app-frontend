import React, { useContext, useEffect, useState } from 'react';
// components imports
import OtherMaterialsContainer from '../../../components/otherMaterial/OtherMaterialsContainer';
// contexts imports
import { useParams } from 'react-router-dom';

export default function OtherMaterials() {

  // utilize params
  const params = useParams()

  return (
    <div className='main-content__container'>
      <OtherMaterialsContainer projectId={params.id}/>
    </div>
  )
}
