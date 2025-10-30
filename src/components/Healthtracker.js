import React from 'react'
import { Link } from 'react-router-dom'

const Healthtracker = () => {
  return (
    <>
        <Link to='/patient'><button>Go Back</button></Link>
        <div>
            <h2>Track Health</h2>
        </div>
    </>
  )
}

export default Healthtracker