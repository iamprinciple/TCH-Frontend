import axios from 'axios'
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateDoctor } from '../redux/Doctorslice'
import { toast, ToastContainer } from 'react-toastify'

const MoreInfo = ({ onUpdateSuccess }) => {
    const { allDoctor } = useOutletContext()
    const [specialization, setSpecialization] = useState("")
    const [experience, setExperience] = useState("")
    const [availableTime, setAvailabletime] = useState([])
    const dispatch = useDispatch()
    

    let userId = localStorage.getItem("id")
    let token = localStorage.getItem("keen")

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const handleDays = (day) => {
        setAvailabletime((prev) => {
            if (prev.includes(day)) {
                return prev.filter((d) => d !== day)
            } else {
                return [...prev, day]
            }
        })
    }

    const updateDoc = async () => {
        // console.log(specialization, experience, availableTime);
        if (!specialization || !experience || !availableTime) {
            toast.error("Missen field!")
            return
        }
        if (experience < 0){
            toast.error("Years of experience cannot be less than 0")
            return
        }
        if (availableTime.length < 3) {
            toast.error("Please select at least 3 days")
            return
        }
        axios.post(`https://hospital-managemant-tch.onrender.com/doctor/update/${userId}`, { specialization, experience, availableTime }, {
            headers: {
                "Authorization": `bearer ${token}`
            }
        }).then((res) => {
            toast.success("Successfull")
            onUpdateSuccess()
            dispatch(updateDoctor(res.data.updated));
            

        }).catch((err) => {
            console.log(err);

        })
    }
    return (
        <>
            <div className='more'>
              
                <h2>Provide more Doctor Information</h2>
                <div className='infodoc'>
                    <div className='docdetails'>
                        <div >
                            <label htmlFor="">Firstname</label>
                            <input className='form-control' type="text" value={allDoctor?.firstname} readOnly />

                        </div>
                        <div >
                            <label htmlFor="">Lastname</label>
                            <input className='form-control' type="text" value={allDoctor?.lastname} readOnly />

                        </div>
                        <div >
                            <label htmlFor="">Role</label>
                            <input className='form-control' type="text" value={allDoctor?.role} readOnly />

                        </div>
                        <div >
                            <label htmlFor="">Contact</label>
                            <input className='form-control' type="text" value={allDoctor?.email} readOnly />

                        </div>
                    </div>
                    <div className='docdetails'>
                        <div >
                            <label htmlFor="">Area of Specialization</label>
                            <input className='form-control' onChange={(e) => setSpecialization(e.target.value)} value={allDoctor?.specialization} type="text" />

                        </div>
                        <div >
                            <label htmlFor="">Years of Experience</label>
                            <input className='form-control' onChange={(e) => setExperience(e.target.value)} value={allDoctor?.experience} type="number" />

                        </div>
                        <div >
                            <label>Available Days (Select at least 3 Days)</label>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "10px", alignItems: "center", flexWrap:"wrap", width:"100%", padding:"20px" }}>
                                {daysOfWeek.map((day) => (
                                    <div key={day + 1} style={{ display: "flex", border: "2px solid black", flexDirection: "row", gap: "20px", alignItems: "center", borderRadius:"15px" , justifyContent:"center", padding:"5px", textAlign:"center"}}>
                                        <p>{day}</p>
                                        <input type="checkbox" name="" id={day} checked={availableTime.includes(day)} onChange={() => handleDays(day)} />
                                    </div>
                                ))}
                            </div>

                        </div>
                        <button onClick={updateDoc}>Update details</button>
                        <ToastContainer/>
                    </div>

                </div>



                
            </div>
        </>
    )
}

export default MoreInfo