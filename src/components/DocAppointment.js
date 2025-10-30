import axios from 'axios';
import React, {useEffect, useState } from 'react'
// import { useOutletContext } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faBan  } from '@fortawesome/free-solid-svg-icons';


const DocAppointment = () => {
    let token = localStorage.getItem("keen")
    let userId = localStorage.getItem("id")
//   const {allAppointment} = useOutletContext()
    const [allAppointment, setallAppointment] = useState([])
    const [updatedAppointment, setUpdatedAppointment] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        axios.get(`https://hospital-managemant-tch.onrender.com/doctor/doctor_appointment/${userId}` ,{
          headers:{
            "Authorization": `bearer ${token}`
          }
        }).then((res)=>{
          console.log(res.data.docAppointment);
          if (res.data.docAppointment) {
            setallAppointment(res.data.docAppointment)
            setLoading(false)
          }
          
        }).catch((err)=>{
          console.log(err);
          setError(err.response.data.message)
          
        })
      
       
      }, [token])

  const handleStatusUpdate = async(id, status)=>{
    try {
        const response = await axios.put(`https://hospital-managemant-tch.onrender.com/doctor/your_appointment/${id}/status`, {status, allAppointment})
        console.log(response.data.data);
        setUpdatedAppointment((prev)=> prev.map((appointment)=>
        appointment._id === id ? {...appointment, status} : appointment
      )
    )
        
    } catch (error) {
        console.log(error);
        setError(error)
    }
  }

    if (loading) return <p style={{color:"gray", textAlign:"center", fontSize:"20px", fontWeight:"700"}}>LOADING...</p>;
    if (error) return <p style={{ color: "red", textAlign:"center", fontSize:"20px", fontWeight:"700" }}>{error}</p>;
  
  return (
    <div className='docApt'>
        <h1>Your appointments</h1>
        {allAppointment.length === 0 ? (
         <p>No appointments found</p>

        ):(
            <table id='apt_table'  cellPadding="7" style={{ borderCollapse: "collapse", width: "100%"}}>
            <thead>
                <tr>
                    <th>Patient</th>
                    <th>Reason</th>
                    <th>Day</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {allAppointment.map((appointment) => (
                    <tr key={appointment._id}>
                        <td>{appointment.patientfirstName} {appointment.patientlastName}</td>
                        <td>{appointment.reason}</td>
                        <td>{appointment.selectedTime}</td>
                        <td>{appointment.status}</td>
                        <td>
                            {appointment.status === "Pending" ? (
                                <div className='d-flex flex-row gap-2'>
                                    <button className='btn btn-success' onClick={() => handleStatusUpdate(appointment._id, "Approved")} ><FontAwesomeIcon icon={faCheck} /></button>
                                    <button className='btn btn-danger' onClick={() => handleStatusUpdate(appointment._id, "Declined")} ><FontAwesomeIcon icon={faXmark} /></button>
                                </div>
                            ) : (
                            <>
                            <p><FontAwesomeIcon icon={faBan} /></p> 
                            </>)}
                          
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
        )}
    </div>
  )
}

export default DocAppointment