import React, { useEffect, useState } from 'react'
import SidenavAdmin from './SidenavAdmin'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../images/TCHlogo-removebg-preview.png'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useDispatch, useSelector } from 'react-redux'

const AdminDashboard = () => {
  const navigate = useNavigate()
  let token = localStorage.getItem("keen")
  let userId = localStorage.getItem("id")
  const [admin, setAdmin] = useState([])
  const [doctors, setDoctors] = useState([])
  const [patient, setPAtient] = useState([])
  const [appointments, setappointments] = useState([])
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await axios.get("https://hospital-managemant-tch.onrender.com/admin/get_all")

        if (response?.data?.doctors && response?.data?.patient && response?.data?.allAppointments) {
          setDoctors(response.data.doctors)
          setPAtient(response.data.patient)
          setappointments(response.data.allAppointments)

        }
      } catch (error) {
        // console.log(error);
        setError(error.message)

      }
    }
    fetchAll()
  }, [])


  useEffect(() => {

    if (!token || !userId) {
      localStorage.removeItem("keen");
      localStorage.removeItem("id");
      navigate("/login")
      return
    }
    axios.get(`https://hospital-managemant-tch.onrender.com/admin/admin/${userId}`, {
      headers: {
        "Authorization": `bearer ${token}`
      }
    }).then((res) => {
      // console.log(res.data.admin);
      if (res?.data?.admin) {
        setAdmin(res.data.admin)
      } else {
        alert("Unauthorized Entry!!!")
        localStorage.removeItem("keen");
        localStorage.removeItem("id");
        navigate("/login")
      }

    }).catch((err) => {
      // console.log(err);
      // alert("Forbidden entry!!!")
      localStorage.removeItem("keen");
      localStorage.removeItem("id");
      // if (err.response) {
      //   setError(err.response.data.message)
      // }
      navigate("/login")

    })

  }, [token, userId])
  const handleLogout = () => {
    localStorage.removeItem("keen")
    localStorage.removeItem("id")
    navigate("/login")
  }

  return (
    <div className='d-flex flex-row justify-content-center align-items-center w-100'>
      <SidenavAdmin />

      <div style={{ height: "100vh", width: "100%", backgroundColor: "#3498db" }}>
        <div className='dropdown'>
          <button className='btn'>
            <FontAwesomeIcon icon={faBars} size='2x' />
          </button>
          <div className='dropMenu'>
            <div className='sidenav22'>
              <img src={logo} alt="The College Hospital Logo" width="220" height="180px" />
              <div className='side'>
                <Link to='/admin'><button>Overview</button></Link>
                <Link to='/admin/doctor'><button>Doctors</button></Link>
                <Link to='/admin/patient'><button>Patients</button></Link>
                <Link to='/admin/all_appointments'><button>Appointments</button></Link>
                <Link to='/admin/pharmacy'><button>Inventory</button></Link>

              </div>
              <button onClick={handleLogout} style={{ width: "100%", backgroundColor: "red", color: "white", fontWeight: "700" }}>Log Out</button>
            </div>
          </div>
        </div>
        <Outlet context={{ admin, doctors, patient, appointments }} />
      </div>


    </div>
  )
}

export default AdminDashboard