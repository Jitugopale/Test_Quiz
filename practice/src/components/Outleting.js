import React from 'react'
import { Link } from 'react-router-dom'

const Outleting = () => {
  return (
    <>
      <h1>Main</h1>
          <p>Go to Comp1</p>
          <Link to="comp1">Comp1</Link>
          <p>Go to Comp2</p>
          <Link to="comp2">Comp2</Link>
          <p>Go to Comp3</p>
          <Link to="comp3">Comp3</Link>
    </>
  )
}

export default Outleting
