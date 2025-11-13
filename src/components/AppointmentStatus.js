import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const AppointmentStatus = () => {
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const userId = useSelector((state) => state.userSlice.alluser._id)
    // console.log(userId);
    

    useEffect(()=>{
        const getAppt = async () =>{
            try {
               const response = await axios.get(`https://hospital-managemant-tch.onrender.com/user/get_appointment/${userId}`)
               setAppointments(response.data.data);
                
            } catch (error) {
                setError(error.response?.data?.message);
                
            } finally{
                setLoading(false)
            }
        }
        if (userId) {
            getAppt()
        }
    },[userId])

    const handleDelete = async(id) =>{
        console.log(id);
        
        if (window.confirm("Do you want to cancel this appointment?")) {
            try {
                await axios.delete(`https://hospital-managemant-tch.onrender.com/user/appointments/${id}`)
                alert("Appointment cancelled successfully!");
                setAppointments((prev) => prev.filter((appt) => appt._id !== id))
                
            } catch (error) {
                console.log(error);
                alert("This feature is unavailable at the time")
                
                
            }
        }else{
            return
        }
    }

    if (loading) {
        return <p>Loading appointments...</p>
    }
    if (error) {
        return <p style={{color: "red"}}>{error}</p>
        
    }
    
  return (
    <div className='d-flex flex-column gap-3 justify-content-center'>
        <h1>Your appointments</h1>
        {appointments.length === 0 ? (
         <p>No appointments found</p>

        ):(
            <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
                <tr>
                    <th>Doctor</th>
                    <th>Reason</th>
                    <th>Day</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody style={{fontSize:"15px", fontWeight:"600"}}>
                {appointments.map((appointment) => (
                    <tr key={appointment._id}>
                        <td>Dr. {appointment.doctorName}</td>
                        <td>{appointment.reason}</td>
                        <td>{appointment.selectedTime}</td>
                        <td>{appointment.status}</td>
                        <td><button className="btn btn-danger" onClick={() => handleDelete(appointment._id)}>Cancel</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        )}
    </div>
  )
}

export default AppointmentStatus