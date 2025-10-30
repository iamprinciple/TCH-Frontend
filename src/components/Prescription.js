import axios from 'axios'
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

const Prescription = () => {
    const { allAppointment } = useOutletContext()
    console.log(allAppointment);
    const allPatient = new Map()
    console.log(allPatient);
    
    allAppointment.forEach(patient => {
        if (!allPatient.has(patient.userId)) {
            allPatient.set(patient.userId, patient)
        }
    });
    
    const patientList = Array.from(allPatient.values())
    console.log(patientList);

    const [prescription , setPrescription] = useState("")
    const submit = async (id) =>{
        console.log(id);
        
        if (!prescription) {
            alert("Field can not be empty!")
            return
        }
        axios.post(`https://hospital-managemant-tch.onrender.com/doctor/prescription/${id}`, {prescription, patientList})
        .then((res)=>{
            console.log(res);
            
        }).catch((err)=>{
            console.log(err);
            
        })
    }

  return (
    <>
        <div className='docApt'>
            <h2>Patients List</h2>
            {patientList.length === 0 ? (
                <p>No patient yet</p>
            ):(
            <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                    <th>Patient</th>
                    <th>Reason</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patientList.map((one) =>(
                    <tr key={one._id}>
                        <td>{one.patientfirstName} {one.patientlastName}</td>
                        <td>{one.reason}</td>
                        <td><input type="text" name='prescription' onChange={(e)=> setPrescription(e.target.value)} placeholder='Input Prescriptions' /> <button onClick={() => submit(one.userId)}>Send </button></td>
                        {/* <td><input type="text"placeholder='Request a Lab test' /> <button>Send </button></td> */}
                        
                    </tr>
                    
                    
                    
                ))}
                </tbody>
            </table>
            )}
        </div>
    </>
  )
}

export default Prescription