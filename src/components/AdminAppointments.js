import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

const AdminAppointments = () => {
  const { appointments } = useOutletContext()
  // console.log(appointments);
  const [search, setsearch] = useState("");
  const filteredApps = appointments.filter((doc) =>
    doc.status?.toLowerCase().startsWith(search.toLowerCase())
  
  )

  return (
    <>
      <div className='adminDocs'>
        <div className='d-flex justify-content-center gap-3'>
          <h2 style={{ color: "white" }}>All Appointments</h2>
          <input onInput={(e) => setsearch(e.target.value)} style={{ width: "50%", padding: "10px", height: "40px", fontWeight: "700" }} type="text" placeholder='Search Appointment by Status' />
        </div>
        <div style={{ maxWidth: "100%", overflowX: "auto" }}>
          <table className='adminTable' >
            <thead style={{ backgroundColor: "red", position: "sticky", top: "0" }}>
              <tr style={{ padding: "20px" }}>
                <th>S/N</th>
                <th>Patient Name</th>
                <th>Appoint for</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>
            <tbody >
              {filteredApps.length > 0 ? (
                filteredApps.map((appts, index) => (
                  <tr key={appts._id}>
                    <td>{index + 1}</td>
                    <td>{appts.patientfirstName}</td>
                    <td>Dr. {appts.doctorName}</td>
                    <td>{new Date(appts.createdAt).toLocaleDateString()}</td>
                    <td>{appts.status}</td>
                    <td><button>Edit</button><button>Delete</button></td>
                  </tr>
                ))
              ) : (
                <p style={{ color: "white" }}>No Appointments</p>
              )}

            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default AdminAppointments