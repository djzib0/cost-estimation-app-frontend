import React from 'react'
// styles imports
import './FormError.css'

export default function FormError(props) {
  return (
    <div className='form-error__container'>{props.errorMessage}</div>
  )
}
