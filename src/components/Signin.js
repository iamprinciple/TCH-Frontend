import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import ger from "../images/Geriatic.png"
import cardio from "../images/Cardio.png"
import derma from "../images/derma.jpg"
import lyr from "../images/lyro.png"
import radio from "../images/Radio.png"
import nuclear from "../images/Nuclear.png"
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {toast, ToastContainer} from "react-toastify"

const Signin = () => {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            role: ""
        },
        onSubmit: async (value) => {
            setLoading(true)
            try {
                const response = await axios.post("https://hospital-managemant-tch.onrender.com/user/signup", value)
                console.log(response);
                toast.success("signup successful ✅",{
                    onClose:()=> navigate('/login'),
                    autoClose: 3000
                })
              
            
            } catch (error) {
                toast.error(error.response?.data?.message)
            } finally {
                setLoading(false)

            }

        },
        validationSchema: yup.object({
            firstname: yup.string().trim().min(4, "Firstname is too short").required("firstname is required"),
            lastname: yup.string().trim().min(4, "Lastname is too short").required("lastname is required"),
            email: yup.string().trim().email("Invalid email").required("email is required"),
            password: yup.string().trim().matches(`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])`, "Password must contain at least one upper case, one lowercae and one number").required("password is required")
        })
    })

    return (
        <>
            <Navbar />
            <div className='signmain'>
                <div className="background">
                    <div>
                        <h1>The College Hospital <br /><span>Effortless Care, <br />Seamless Management</span></h1>

                    </div>
                </div>
                <div className='sec2' >
                    <h5>Departments</h5>
                    <div id='htserve' className='d-flex flex-row justify-content-between'>
                        <h2>Health Care Services</h2>
                        <button style={{ backgroundColor: "transparent", border: "none", fontSize: "25px", fontWeight: "400", color: "blue" }}>More Services +</button>
                    </div>
                    <div data-aos="zoom-in" className='services' >
                        <div>
                            <img src={ger} alt="GERIATRIC CARE" />
                            <h3>GERIATRIC CARE</h3>
                        </div>
                        <div>
                            <img src={cardio} alt="CARDIOTHORACIC" />
                            <h3>CARDIOTHORACIC</h3>
                        </div>
                        <div>
                            <img src={derma} alt="dermatologist" />
                            <h3>DERMATOLOGIST</h3>
                        </div>
                        <div>
                            <img src={lyr} alt="LAPAROSCOPY" />
                            <h3>LAPAROSCOPY</h3>
                        </div>
                        <div>
                            <img src={radio} alt="RADIOLOGY" />
                            <h3>RADIOLOGY</h3>
                        </div>
                        <div>
                            <img src={nuclear} alt="NUCLEAR MEDICINE" />
                            <h3>NUCLEAR MEDICINE</h3>
                        </div>
                    </div>
                </div>
                <div className='trust'>
                    <h4 data-aos="fade-right">Trust Us To Be There To Help All & Make Things Well Again.</h4>
                    <button className='joinBtn'>Join Us Today!</button>

                    <form onSubmit={formik.handleSubmit}>

                        {/* <h1 className='text-center'>Sign Up</h1> */}
                        <div className='form-group d-flex gap-1 flex-column'>
                            <label htmlFor="">Firstname</label>
                            <input placeholder='Enter Firstname' className={formik.touched.firstname && formik.errors.firstname ? "form-control is-invalid" : "form-control"} name='firstname' value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" />
                            {formik.touched.firstname && <small className='text-danger'>{formik.errors.firstname}</small>}
                        </div>
                        <div className='form-group d-flex gap-1 flex-column'>
                            <label htmlFor="">Lastname</label>
                            <input placeholder='Enter Lastname' className={formik.touched.lastname && formik.errors.lastname ? "form-control is-invalid" : "form-control"} name='lastname' value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" />
                            {formik.touched.lastname && <small className='text-danger'>{formik.errors.lastname}</small>}
                        </div>
                        <div className='form-group d-flex gap-1 flex-column'>
                            <label htmlFor="">Email</label>
                            <input placeholder='Enter Email' className={formik.touched.email && formik.errors.email ? "form-control is-invalid" : "form-control"} name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" />
                            {formik.touched.email && <small className='text-danger'>{formik.errors.email}</small>}
                        </div>
                        <div className='form-group d-flex gap-1 flex-column'>
                            <label htmlFor="">Role</label>
                            <select name="role" className={formik.touched.role && formik.errors.role ? "form-control is-invalid" : "form-control"} value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                <option value="">Select option</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Patient">Patient</option>
                                {/* <option value="Admin">Admin</option> */}
                            </select>
                            {formik.touched.role && <small className='text-danger'>{formik.errors.role}</small>}
                        </div>
                        <div  className='form-group d-flex gap-1 flex-column'>
                            <label htmlFor="">Password</label>
                            <div id='pass_container' className='d-flex flex-column gap-2'>
                                <input placeholder='Password' className={formik.touched.password && formik.errors.password ? "form-control is-invalid" : "form-control"} name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type={showPassword ? "text" : "password"} />
                                <button className='toggle-icon btn ' type='button' onClick={() => setShowPassword(!showPassword)}>

                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>

                            {formik.touched.password && <small className='text-danger'>{formik.errors.password}</small>}
                        </div>
                        <button className='btn btn-primary' type='submit' disabled={loading || ""}>
                            {loading ? "Loading..." : "Sign Up"}
                        </button>
                        <hr />
                        <p id='have'>Have an account? <Link to="/login">Log In</Link></p>
                        <ToastContainer/>
                    </form>
                </div>
                <footer>
                    {/* <h1>Footer Here </h1> */}
                </footer>

            </div>

        </>
    )
}

export default Signin