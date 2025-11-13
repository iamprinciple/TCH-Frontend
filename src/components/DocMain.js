import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { useSelector } from 'react-redux'
const DocMain = () => {
    const  allDoctor  = useSelector((state => state.doctorSlice.allDoctor))
    
    const { allAppointment } = useOutletContext()
    // console.log(allAppointment);
    
    const approvedAppointments = allAppointment.filter(appointment => appointment.status === "Approved");
    // console.log(approvedAppointments);
    
    const allPatient = new Set(approvedAppointments.map(patient => patient.userId));
//    console.log(allPatient);
   
    
    return (
        <>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-evenly", height:"100vh", overflowX:"auto"}}>
                <div style={{width:"100%", borderBottom:"3px solid #064c7a", padding:"20px"}}>
                    <h1>Welcome, Dr. {allDoctor.firstname} !</h1>
                    <p style={{fontSize:"20px", fontWeight:"500"}}>Here is an overview of your dashboard</p>
                </div>


                <div id='tag_holder'>
                    <div id='mq_tag' >
                        <h3>Upcoming Appointment</h3>
                        <h5>{approvedAppointments.length || "0"}</h5>
                    </div>
                    <div id='mq_tag' >
                        <h3>Total Patients</h3>
                        <h5>{allPatient.size || "0"}</h5>
                    </div>
                    <div id='mq_tag' >
                        <h3>Pending Prescriptions</h3>
                    </div>
                </div>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"30px", width:"100%", height:"auto"}}>
                    <h2>Quick Actions</h2>
                    <div id='quick'>
                        <button><Link to='/doctor/appointments'>View Appointments </Link></button>
                        <button><Link  to='/doctor/make_prescription'>View Patient List</Link></button>
                        <button><Link to='/doctor/doctor_profile'> Profile</Link></button>
                    </div>
                    
                </div>
            </div>

        </>
    )
}

export default DocMain