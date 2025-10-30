import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { UpdateUser } from '../redux/Userslice'
import axios from 'axios'
import { useOutletContext, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const Profile = () => {
  const { alluser } = useOutletContext()
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
    axios.post(`https://hospital-managemant-tch.onrender.com/user/upload/${userId}`, { img }, {
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

      <div >
        <div className='dropdown'>
          <button className='btn'>
            <FontAwesomeIcon icon={faBars} size='2x' />
          </button>
          <div className='dropMenu'>
            <div className='sidenav22'>
              <h3>The College Hospital</h3>
              <div className='side'>
                <Link to='/patient'><button>Dashboard</button></Link>
                <Link to='/patient/profile'><button>Profile</button></Link>
                <Link to='/patient/medical-records'><button>Medical Records</button></Link>

                <Link to='/patient/pharmacy'><button>Pharmacy</button></Link>
                <button>Contact Us</button>
              </div>
            </div>
          </div>
        </div>
        {/* <form> */}
        <div className='info' >

          <h2>Your Profile</h2>
          <div className='profile'>

            <h4>Personal Information</h4>
            {error && <strong className='text-danger'>{error}</strong>}
            {message && <strong className='text-secondary'>{message}</strong>}
            <div>

              <input onChange={(e) => handleChange(e)} type="file" />
              <img src={alluser.image} alt="" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
              <button className='btn btn-success' onClick={upload}>Change Profile Picture</button>
            </div>
            <div>
              <label htmlFor="">Firstname</label>
              <input type="text" name='firstname' value={alluser.firstname} readOnly />

            </div>
            <div>
              <label htmlFor="">Lastname</label>
              <input type="text" name='lastname' value={alluser.lastname} readOnly />

            </div>

            <div>
              <label htmlFor="">Gender</label>
              <select>
                <option value="">Select Option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

          </div>
          <div className='profile'>
            <h4>Contacts</h4>
            <div>
              <label htmlFor="">Email</label>
              <input type="text" name='email' value={alluser.email} readOnly />

            </div>
            <div>
              <label htmlFor="">Phone Number</label>
              <input type="text" name='phone' value={alluser.phoneNo} />

            </div>
          </div>
        </div>

        {/* <button type='submit'>Update Profile</button> */}
        {/* </form> */}
      </div>
    </>
  )
}

export default Profile