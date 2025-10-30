import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

const AdminDoc = () => {
  const { doctors } = useOutletContext()
  // console.log(doctors);
  const [search, setsearch] = useState("");
  const filteredDoc = doctors.filter((doc) =>
    doc.specialization?.toLowerCase().startsWith(search.toLowerCase())
  )

  return (
    <>
      <div className='adminDocs'>
        <div className='d-flex justify-content-center gap-3'>
          <h2 style={{ color: "white" }}>All Doctors</h2>
          <input onInput={(e) => setsearch(e.target.value)} style={{ width: "50%", padding: "10px", height: "40px", fontWeight: "700" }} type="text" placeholder='Search Doctor by Department' />
        </div>

        <div style={{ maxWidth: "100%", overflowX: "auto" }}>
          <table className='adminTable'>
            <thead style={{ backgroundColor: "grey", position: "sticky", top: "0" }}>
              <tr style={{ padding: "20px" }}>
                <th>S/N</th>
                <th>Doctor's Name</th>
                <th>Department</th>
                <th>Joined</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody >
              {filteredDoc.length > 0 ? (
                filteredDoc.map((oneDoc, index) => (
                  <tr key={oneDoc._id}>
                    <td>{index + 1}</td>
                    <td>{oneDoc.firstname} {oneDoc.lastname}</td>
                    <td>{oneDoc.specialization}</td>

                    <td>{new Date(oneDoc.createdAt).toLocaleDateString()}</td>
                    <td>{oneDoc.email}</td>
                  </tr>
                ))
              ) : (
                <p style={{ color: "white" }}>No Doctors yet</p>
              )}

            </tbody>
          </table>
        </div>



      </div>
    </>
  )
}

export default AdminDoc