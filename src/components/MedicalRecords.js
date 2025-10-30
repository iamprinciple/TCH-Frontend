import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
      console.log(res.data.data);
      setallPrescription(res.data.data)
      setLoading(false)
    }).catch((err)=>{
      console.log(err);
      //properly handle error
      
    })
  },[])
  return (
    <>
      <div className='book'>
        <Link to= '/patient'><button>Go Back</button></Link>

        <div className='records'>
          <h2>Your Records</h2>
          {allPrescription.length === 0 ?(
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