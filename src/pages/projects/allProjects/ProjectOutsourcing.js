import React, { useContext, useEffect, useState } from 'react';
// components imports
import OutsourcingContainer from '../../../components/outsourcing/OutsourcingContainer';
// contexts imports
import { useParams } from 'react-router-dom';

export default function ProjectOutsourcing() {

  // utilize params
  const params = useParams()

  return (
    <div className='main-content__container'>
      <OutsourcingContainer projectId={params.id} />
    </div>
  )
}
