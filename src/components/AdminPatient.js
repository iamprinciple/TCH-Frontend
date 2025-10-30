import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

const AdminPatient = () => {
    const { patient } = useOutletContext()
    const [search, setsearch] = useState("");
    const filtered = patient.filter((pa) =>
        pa.firstname?.toLowerCase().includes(search.toLowerCase())
    )
    return (
        <>
            <div className='adminDocs'>
                <div className='d-flex justify-content-center gap-3'>
                    <h2 style={{ color: "white" }}>All Patients</h2>
                    <input onInput={(e) => setsearch(e.target.value)} style={{ width: "50%", padding: "10px", height: "40px", fontWeight: "700" }} type="text" placeholder='Search Patient by Name' />
                </div>

                <div style={{ maxWidth: "100%", overflowX: "auto" }}>
                    <table className='adminTable'>
                        <thead style={{ backgroundColor: "grey", position: "sticky", top: "0" }}>
                            <tr style={{ padding: "20px" }}>
                                <th>S/N</th>
                                <th>Patient Name</th>
                                <th>Joined</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        <tbody >
                            {filtered.length > 0 ? (
                                filtered.map((onePatient, index) => (
                                    <tr key={onePatient._id}>
                                        <td>{index + 1}</td>
                                        <td>{onePatient.firstname} {onePatient.lastname}</td>

                                        <td>{new Date(onePatient.createdAt).toLocaleDateString()}</td>
                                        <td>{onePatient.email}</td>
                                    </tr>
                                ))
                            ) : (
                                <p style={{ color: "white" }}>No Patient yet</p>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminPatient