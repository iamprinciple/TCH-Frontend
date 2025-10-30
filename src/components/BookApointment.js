import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AppointmentStatus from './AppointmentStatus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const BookApointment = () => {
  const navigate = useNavigate()

  const [allDoctors, setallDoctors] = useState([]);
  const [search, setsearch] = useState("");
  const [error, setError] = useState(null)
  let token = localStorage.getItem("keen")
  let userId = localStorage.getItem("id")

  useEffect(() => {
    if (!userId || !token) {
      setError('user not found')
      return
    }
    const fetchDocs = async () => {
      try {
        const response = await axios.get("https://hospital-managemant-tch.onrender.com/user/get_doctors"
          , {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        if (response.data) {
          setallDoctors(response.data.doctors)
        }
      } catch (error) {
        console.log(error);
        setError(error.message)
      }


    }

    fetchDocs()
  }, [token, userId])
  const handleDetails = (doctor) => {
    navigate('/patient/doctor-details', { state: { doctor } })
  }
  const filteredDoc = allDoctors.filter((doc)=> 
   doc.specialization?.toLowerCase().startsWith(search.toLowerCase())
  )
  return (
    <>

      <div className='book'>
        <Link to='/patient'><button id='goBack'><FontAwesomeIcon icon={faArrowLeft} size='2x'/></button></Link>
        <div className='details'>
          {error && <p>{error}</p>}
          <div className='docs'>
            <div className='doc_header'>
              <h3>Available Doctors</h3>
              <input onInput={(e)=> setsearch(e.target.value)}  type="text" placeholder='Search Doctor by speciaization' />
            </div>

            {filteredDoc.length > 0 ? (
              filteredDoc.map((onedoc, index) => (
                <div id='book_menu' key={index} style={{ border: "1px solid #ccc", padding: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", textAlign: "center", alignItems:"center"}}>
                  <img src={onedoc.image} alt={onedoc.firstname} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                  <p style={{ textAlign: "center" }}>Dr. {onedoc.firstname} {onedoc.lastname}</p>
                  <p style={{ textAlign: "center" }}>{onedoc.specialization || "Not Provided"}</p>
                  <strong style={{ textAlign: "center", color:"blue", fontSize:"15px", fontWeight:"700" }}>Experience: {onedoc.experience || "Not Provided"}</strong>
                  <button style={{ backgroundColor: "transparent", borderRadius: "25px", border: "1px solid white" }} onClick={() => handleDetails(onedoc)}><FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
              ))
            ) : (
              <p>No doctors Available at the time</p>
            )}
          </div>
          <div>
            <AppointmentStatus />
          </div>
        </div>

      </div>
    </>
  )
}

export default BookApointment