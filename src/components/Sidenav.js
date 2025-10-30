import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/TCHlogo-removebg-preview.png'


const Sidenav = () => {
  const [showModal, setShowmodal] = useState(false)
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("keen")
    localStorage.removeItem("id")
    navigate("/login")
  }
  return (
    <>
      <div className='sidenav'>
        <img src={logo} alt="The College Hospital Logo" width="220" height="180px" />
        <div className='side'>
          <Link to='/patient'><button>Dashboard</button></Link>
          <Link to='/patient/profile'><button>Profile</button></Link>
          <Link to='/patient/medical-records'><button>Medical Records</button></Link>
          {/* <Link to='/patient/test'><button>Lab Tests Result</button></Link> */}
          <Link to='/patient/pharmacy'><button>Pharmacy</button></Link>
          <button>Contact Us</button>
        </div>
        <button onClick={() => setShowmodal(true)} id='logout'>Log Out</button>
        {showModal && (
          <div className='overlay'>
            <div className='modal'>
              <h3>Are you sure you want to logout?</h3>
              <div className='modalbtn'>
                <button className='confirm' onClick={handleLogout}>Yes</button>
                <button className='cancel' onClick={() => setShowmodal(false)}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  )
}

export default Sidenav