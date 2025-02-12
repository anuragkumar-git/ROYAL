import React from 'react'
import {useParams} from 'react-router-dom'

export const View = () => {
    const id = useParams().id
  return (
    <div>
        <h1>{id}</h1>
    </div>
  )
}
