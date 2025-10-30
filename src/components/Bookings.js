
import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';


const Bookings = () => {
    // const {allUser} = useOutletContext()
    const location = useLocation()
    const doctor = location.state?.doctor

    const [aptType, setAptType] = useState("")
    const [reason, setReason] = useState("")
    const [selectedTime, setSelectedTime] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    let userId = localStorage.getItem("id")
    let token = localStorage.getItem("keen")

    if (!doctor) {
        return <p>No doctor details available</p>
    }
    const handleSubmit = () => {

        if (!selectedTime || !aptType || !reason) {
            alert('Please select a time, appointment type, and provide a reason.');
            return;
        }

        axios.post(`https://hospital-managemant-tch.onrender.com/user/book_appointment/${userId}`, { doctorId: doctor._id, doctorName: doctor.firstname, doctorEmail: doctor.email, aptType, reason, selectedTime }, {
            headers: {
                "Authorization": `bearer ${token}`
            },

        }).then((res) => {
            console.log(res);
            toast.success(res.data.message)
            // setMessage(res.data.message)
            setAptType("")
            setReason("")
            setSelectedTime("")
        }).catch((err) => {
            console.log(err);
            // setError(err.response.data.message)
            toast.error(err.response.data.message)
            setAptType("")
            setReason("")
            setSelectedTime("")
        })
    }

    return (
        <>
            <div className='book'>
                <Link to='/patient/book-appointment'><button id='goBack'><FontAwesomeIcon icon={faArrowLeft} size='2x' /></button></Link>
                <div className='details'>
                    <h2>Doctor's Details</h2>
                    <div className='mq_details'>
                        <img src={doctor.image} alt={doctor.firstname} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                        <div className='docs'>
                            <p><strong>Name:</strong> Dr. {doctor.firstname} {doctor.lastname}</p>
                            <p><strong>Specialization:</strong> {doctor.specialization || "Not Provided"}</p>
                            <p><strong>Experience:</strong> {doctor.experience || "Not Provided"} years</p>
                            <p><strong>Contact:</strong> {doctor.email || "Not Provided"}</p>
                            <h3>Available Days (Choose a day for your appointment)</h3>
                            <div className='times'>
                                {doctor.availableTime && doctor.availableTime.length > 0 ? (
                                    doctor.availableTime.map((time, index) => (
                                        <button key={index} className='btn btn-gray' onClick={() => { setSelectedTime(time) }} style={{ backgroundColor: selectedTime === time ? 'green' : 'white', borderRadius: "15px", width: "100px", height: "40px", fontWeight: "900px", color:"green" }}>
                                            {time}
                                        </button>
                                    ))
                                ) : (<p>Not available</p>)}
                            </div>
                        </div>

                    </div>

                    <div className='reg'>
                        <h3>Register your appointment now</h3>

                        <div>
                            <label>Appointment type</label>
                            <select style={{ width: "50%", height: "40px" }} name="aptType" value={aptType} onChange={(e) => setAptType(e.target.value)}>
                                <option value="">Select option</option>
                                <option value="New Appointment">New Appointment</option>
                                <option value="Follow Up">Follow Up</option>
                            </select>
                        </div>
                        <div>
                            <label>Reason for a visit</label>
                            <input style={{ width: "50%", height: "40px" }} type="text" className='form-control' value={reason} name='reason' onChange={(e) => setReason(e.target.value)} placeholder='Reason for visit' />

                        </div>
                        {error && <strong className='text-danger'>{error}</strong>}
                        {message && <strong>{message}</strong>}
                        <button onClick={handleSubmit}>Create Appointment</button>

                    </div>
                    <ToastContainer/>
                </div>

            </div>

        </>
    )
}

export default Bookings