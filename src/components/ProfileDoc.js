import React, {useState} from 'react'
import { useOutletContext } from 'react-router-dom'
import axios from "axios";

const ProfileDoc = () => {
  const { allDoctor } = useOutletContext()
  
  const [img, setImg] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState(null)

  let token = localStorage.getItem("keen")
  let userId = localStorage.getItem("id")
 
  

   const handleChange = (e) => {
    let imageFile = e.target.files[0]
    let reader = new FileReader()
    reader.onload = (e) => {
      setImg(e.target.result)
    }
    reader.readAsDataURL(imageFile)
  }
  const upload = () => {
    axios.post(`https://hospital-managemant-tch.onrender.com/doctor/upload/${userId}`, { img }, {
      headers: {
        "Authorization": `bearer ${token}`
      }
    }
    ).then((res) => {
      console.log(res.data.message);
      setMessage(res.data.message)

    }).catch((err) => {
      console.log(err.response.data.message);
      setError(err.response.data.message)
    })
  }

  return (
    <>
      <div className='d-flex flex-column gap-2 p-3 align-items-center w-100 h-100'>
        <h2>Your Profile</h2>
        <div className='d-flex flex-column gap-3 w-100'>
          <h4>Personal Information</h4>
          {error && <strong className='text-danger'>{error}</strong>}
            {message && <strong className='text-secondary'>{message}</strong>}
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center w-100 p-3 border border-dark flex-wrap">
              <div className="mb-3 mb-md-0 text-center">
                <img src={allDoctor.image} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit:"cover" }} />
              </div>
              <div className='d-flex flex-row flex-sm-row gap-3 align-items-center'>
                <input style={{backgroundColor:"silver", borderRadius:"20px", maxWidth:"250px"}} onChange={(e) => handleChange(e)} type="file" />
                <button style={{backgroundColor:"#3498db", borderRadius:"50%", padding:"10px 15px" }} onClick={upload}>Upload Picture</button>
              </div>
            </div>
            <div id='docInfo' className='d-flex flex-column gap-1'>
              <h4>Dr. {allDoctor.firstname} {allDoctor.lastname}</h4>
              <p>{allDoctor.specialization}</p>
              <p>{allDoctor.experience}</p>
              <p>{allDoctor.email}</p>
            </div>

          </div>

          <div>
            <h5>Available Time</h5>
            {allDoctor.availableTime.map((time, index) => (
              <button key={index}>{time}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileDoc