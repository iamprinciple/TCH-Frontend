import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const Records = () => {
  let token = localStorage.getItem("keen")
  let userId = localStorage.getItem("id")

  const [allRecord, setallRecord] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://hospital-managemant-tch.onrender.com/user/records/${userId}`, {
      headers: {
        "Authorization": `bearer ${token}`
      }
    }).then((res) => {
      // console.log(res.data.records);
      if (res.data.records) {
        setallRecord(res.data.records)
      }
    }).catch((err) => {
      // console.log(err);
      setError(err.response.data.message)
    })
  }, [token, userId])

  return (
    <div className='docApt'>
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
      <h1>Payment History</h1>
      <div>
        {error? (
          <p style={{color:"red"}}>{error}</p>
        ):
        allRecord.length === 0 ? (
          <p>Fetching...</p>
        ) : (

          <table cellPadding="7" style={{ width: "100%" }}>
            <thead>
              <tr style={{ fontSize: "28px", fontWeight: "700" }}>
                <th>Amount</th>
                <th>Status</th>
                <th>Date & time</th>
              </tr>
            </thead>
            <tbody>
              {allRecord.map((oneRecord) => (
                <tr style={{ fontSize: "21px", fontWeight: "500" }}>
                  <td># {oneRecord.amount}</td>
                  <td> {oneRecord.status}</td>
                  <td>{new Date(oneRecord.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>

  )
}

export default Records