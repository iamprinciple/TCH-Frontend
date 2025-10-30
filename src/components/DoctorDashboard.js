import React, { useState } from 'react'
import SidenavDoctor from './SidenavDoctor'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchingData, fetchDoctor, fetchError, fetchAppointment } from '../redux/Doctorslice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/TCHlogo-removebg-preview.png'


const DoctorDashboard = () => {
  const navigate = useNavigate()
  // const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  let token = localStorage.getItem("keen")
  let userId = localStorage.getItem("id")

  
  const dispatch = useDispatch()
  let { isFetching, allDoctor, fetcherror, allAppointment } = useSelector(state => state.doctorSlice)
  console.log(allAppointment);
  
  useEffect(() => {
    dispatch(fetchingData())
    if (!userId || !token) {
      setError('user not found')
      localStorage.removeItem("keen");
      localStorage.removeItem("id");
      navigate("/login")
      return
    }
    axios.get(`https://hospital-managemant-tch.onrender.com/doctor/doctor/${userId}`, {
      headers: {
        "Authorization": `bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data.doctor);
      if (res?.data?.doctor) {
        // setUserData(res.data.doctor)
        dispatch(fetchDoctor(res.data.doctor))
      } else {
        // alert("Unauthorized Entry!!!")
        localStorage.removeItem("keen");
        localStorage.removeItem("id");
        navigate("/login")
      }


    }).catch((err) => {
      console.log(err);
      // alert("Unauthorized Entry!!!")
      
      if (err.response) {
        // console.error("Server Error:", err.response.data.message);
        dispatch(fetchError(err.response.data.message));
        localStorage.removeItem("keen");
        localStorage.removeItem("id");
        navigate("/login")
        // alert(err.response.data.message);
      } else {
        // console.error("Network Error:", err.message);
        dispatch(fetchError("Network error! Please check your connection."));
        alert("Network error! Please check your connection.");
      }
      
    })

  }, [token])

  useEffect(() => {
    axios.get(`https://hospital-managemant-tch.onrender.com/doctor/doctor_appointment/${userId}`, {
      headers: {
        "Authorization": `bearer ${token}`
      }
    }).then((res) => {
      // console.log(res.data.docAppointment);
      if (res?.data?.docAppointment) {
        dispatch(fetchAppointment(res.data.docAppointment))
      }


    }).catch((err) => {
      console.log(err);

    })


  }, [token])
  const handleLogout = () =>{
    localStorage.removeItem("keen")
    localStorage.removeItem("id")
    navigate("/login")
  }

  return (
    <>
      <div className='d-flex flex-row justify-content-center align-items-center w-100'>
        <SidenavDoctor />
        <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", padding:"10px" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "20px", alignItems: "center", borderBottom: "2px solid #064c7a", top: "0",  height:"80px" }}>
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
                    <Link to='/doctor'><button>Dashboard</button></Link>
                    <Link to='/doctor/doctor_profile'><button>Profile</button></Link>
                    <Link to='/doctor/appointments'><button>Appointments</button></Link>
                    <Link to='/doctor/make_prescription'><button>Make Prescription</button></Link>


                  </div>
                  <button onClick={handleLogout} style={{width:"100%", backgroundColor:"red", color:"white", fontWeight:"700"}}>Log Out</button>
                </div>
              </div>
            </div>


            <div style={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "center" }}>
              {allDoctor?.image && (
                <img src={allDoctor.image} alt=""
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }} />)}

              <strong>{allDoctor?.specialization || "No Specialization"}</strong>
            </div>

          </div>

          {isFetching ? (<p style={{ textAlign: "center", fontWeight: "700" }}>FETCHING DATA...</p>
          ) : fetcherror ? (
            <p>{fetcherror}</p>
          ) : (
            
            <Outlet context={{ allDoctor, allAppointment }} />
          )}




        </div>
      </div>
    </>
  )
}

export default DoctorDashboard