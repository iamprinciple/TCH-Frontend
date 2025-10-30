import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/TCHlogo-removebg-preview.png'

const SidenavAdmin = () => {
    const [showModal, setShowmodal] = useState(false)
    const navigate = useNavigate()
    const handleLogout = () =>{
        localStorage.removeItem("keen")
        localStorage.removeItem("id")
        navigate("/login")
    }
    return (
        <>
            <div className='sidenav' >
                <img src={logo} alt="The College Hospital Logo" width="220" height="180px" />
               
                <div className='side'>
                    
                    <Link to='/admin'><button>Overview</button></Link>
                    <Link to='/admin/doctor'><button>Doctors</button></Link>
                    <Link to='/admin/patient'><button>Patients</button></Link>
                    <Link to='/admin/all_appointments'><button>Appointments</button></Link>
                    <Link to='/admin/pharmacy'><button>Inventory</button></Link>
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

export default SidenavAdmin