import React from 'react'
import { useOutletContext } from 'react-router-dom'

const AdminLanding = () => {
    
    const { admin, doctors, patient, appointments, setAppointments } = useOutletContext()

    return (
        <>
            <div style={{ height: "100vh", width: "100%", padding: "10px", display:"flex", flexDirection:"column", gap:"30px" }}>
                <div style={{ width: "100%", borderBottom: "3px solid #064c7a", padding: "20px" }}>
                    <h1 style={{ color: "white" }}>Welcome, Admin {admin.firstname} !</h1>
                    <p style={{ fontSize: "20px", fontWeight: "500", color: "white" }}>Overview</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", padding: "10px", width: "100%", height: "auto", gap: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "10px", backgroundColor: "#064c7a", color:"whitesmoke", padding: "10px", width: "30%", height: "150px", borderRadius: "20px" }}>
                        <h3>Doctors</h3>
                        <h5>{doctors.length || "0"}</h5>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "10px", backgroundColor: "#064c7a", color:"whitesmoke", padding: "10px", width: "30%", height: "150px", borderRadius: "20px" }}>
                        <h3>Patients</h3>
                        <h5>{patient.length || "0"}</h5>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "10px", backgroundColor: "#064c7a", color:"whitesmoke", padding: "10px", width: "30%", height: "150px", borderRadius: "20px" }}>
                        <h3>Total Appointments</h3>
                        <h5>{appointments.length || "0"}</h5>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "10px", backgroundColor: "#064c7a", color:"whitesmoke", padding: "10px", width: "30%", height: "150px", borderRadius: "20px" }}>
                        <h3>Balance</h3>

                    </div>
                </div>
                <div style={{ maxWidth: "100%", overflowX: "auto" }}>
                    <table className='adminTable' >
                    <thead style={{backgroundColor:"red", position:"sticky", top:"0"}}>
                        <tr style={{padding:"20px"}}>
                            <th>S/N</th>
                            <th>Patient Name</th>
                            <th>Appoint for</th>
                            <th>Created At</th>
                            <th>Status</th>
                            
                        </tr>
                        
                    </thead>
                    <tbody >
                        {appointments.map((appts, index) =>(
                            <tr key={appts._id}>
                                <td>{index + 1}</td>
                                <td>{appts.patientfirstName}</td>
                                <td>Dr. {appts.doctorName}</td>
                                <td>{new Date(appts.createdAt).toLocaleDateString()}</td>
                                <td>{appts.status}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                
            </div>
        </>
    )
}

export default AdminLanding