import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const MedicalRecords = () => {
  let token = localStorage.getItem("keen")
  let userId = localStorage.getItem("id")

  const [allPrescription, setallPrescription] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(()=>{
    axios.get(`https://hospital-managemant-tch.onrender.com/user/doctor_prescriptions/${userId}`,{
      headers:{
        "Authorization": `bearer ${token}`
      }
    }).then((res)=>{
      // console.log(res.data.data);
      setallPrescription(res.data.data)
      setLoading(false)
    }).catch((err)=>{
      console.log(err);
      setError("Can't fecth... Pleace check back")
      //properly handle error
      
    })
  },[token, userId])
  return (
    <>
      <div className='book'>
        <Link to='/patient'><button id='goBack'><FontAwesomeIcon icon={faArrowLeft} size='2x' /></button></Link>
        <div className='records'>
          <h2>Your Records</h2>
          
          {loading ? (
              <p>LOADING...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : allPrescription.length === 0 ?(
            <p>Wait for your prescriptions</p>
          ):(
            <div>
            {allPrescription.map((onePres) =>(
              <div key={onePres._id}>
                <h3>All Prescriptions</h3>
                <div className='d-flex flex-row justify-content-between'>
                  <h5>{onePres.prescription}</h5>
                  <p>{onePres.createdAt}</p>
                  <Link to='/patient/pharmacy'><button>Get now!</button></Link>
                </div>
              </div>
            ))}
            

          </div>
          )}
          
          
        </div>
      </div>
    </>
  )
}

export default MedicalRecords