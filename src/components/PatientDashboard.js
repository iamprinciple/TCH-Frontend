import React, { useEffect } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import book from "../images/book-appointment.jpeg"
import records from "../images/medical-records.jpg"
import payment from "../images/payment.png"
import track from "../images/track.jpg"
import pharm from "../images/pharmacy.jpeg"
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/TCHlogo-removebg-preview.png'


const PatientDashboard = () => {
  const navigate = useNavigate()
  const { alluser } = useOutletContext()
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("keen")
    localStorage.removeItem("id")
    navigate("/login")
  }
  return (
    <>
      {/* <div style={{ height: "100vh", backgroundColor: "red", width: "100%" }}> */}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px", width:"100%", height:"100vh"}} >
          <div style={{ width: "100%", borderBottom: "2px solid #3498db", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <div className='d-flex flex-row align-items-center gap-3'>
              <button className='btn' id='hidden_btn'>
                <FontAwesomeIcon icon={faBars} size='2x' />
              </button>
              <div className='dropdown'>
                <button className='btn'>
                  <FontAwesomeIcon icon={faBars} size='2x' />
                </button>
                <div className='dropMenu'>
                  <div className='sidenav22'>
                    <img src={logo} alt="The College Hospital Logo" width="220" height="180px" />
                    <div className='side'>
                      <Link to='/patient'><button>Dashboard</button></Link>
                      <Link to='/patient/profile'><button>Profile</button></Link>
                      <Link to='/patient/medical-records'><button>Medical Records</button></Link>

                      <Link to='/patient/pharmacy'><button>Pharmacy</button></Link>
                      <button>Contact Us</button>
                    </div>
                    <button onClick={handleLogout} style={{ width: "100%", backgroundColor: "red", color: "white", fontWeight: "700" }}>Log Out</button>
                  </div>
                </div>
              </div>
              <h1 id='greeting'>Welcome, {alluser.firstname} !</h1>
            </div>

            <img src={alluser.image} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />

          </div>

          <div data-aos="fade-up" className='patientDash'>
            <div>
              <img src={book} alt="" />
              <Link to='/patient/book-appointment' style={{ textDecoration: "none" }}>
                <h3>Book Appointment</h3>
              </Link>
            </div>


            <div>
              <img src={records} alt="" />
              <Link to="/patient/medical-records" style={{ textDecoration: "none" }}>
                <h3>Medical Records</h3>
              </Link>
            </div>

            <div>

              <img src={pharm} alt="" />
              <Link to="/patient/pharmacy" style={{ textDecoration: "none" }}><h3>Pharmacy</h3></Link>
            </div>
            <div>
              <img src={track} alt="" />
              <Link to="/patient/track_health" style={{ textDecoration: "none" }}><h3>Track Your Health</h3></Link>
            </div>
            <div>
              <img src={payment} alt="" />
              <Link to='/patient/records' style={{ textDecoration: "none" }}><h3>Billings & History</h3></Link>
            </div>
            <div>
              <img src={book} alt="" />
              <h3>Feedback & Support</h3>
            </div>

          </div>

        </div>

      {/* </div> */}


    </>
  )
  
}

export default PatientDashboard