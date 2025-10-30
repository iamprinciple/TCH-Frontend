import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (value) => {
            setLoading(true)
            axios.post("https://hospital-managemant-tch.onrender.com/user/login", value)
                .then((res) => {
                    // console.log(res.data.existingUser);
                    if (res.data) {
                        localStorage.setItem("keen", res.data.token)
                        localStorage.setItem("id", res.data.existingUser._id)
                        const role = res.data.existingUser.role
                        if (role === 'Admin') {
                            toast.success("Admin login successful ✅", {
                                onClose: () => navigate('/admin'),
                                autoClose: 3000
                            })
                            // navigate("/admin")
                        } else if (role === 'Doctor') {
                            toast.success("Doctor login successful ✅", {
                                onClose: () => navigate('/doctor'),
                                autoClose: 3000
                            })
                            // navigate("/doctor")

                        } else if (role === 'Patient') {
                            toast.success("Patient login successful ✅", {
                                onClose: () => navigate('/patient'),
                                autoClose: 3000
                            })
                            // navigate("/patient")

                        }
                        setLoading(false)
                    } else {
                        console.log("No token");

                    }
                }).catch((err) => {
                    setLoading(false)
                    toast.error(err.response.data.message)

                })

        }
    })
    // console.log(formik.errors);

    return (
        <>
            <Navbar />
            <div className='signmain'>
                <div className='loginForm'>
                    <form onSubmit={formik.handleSubmit}>
                        <h1>Log in</h1>
                        <div className='form-group'>
                            <label htmlFor="">Email</label>
                            <input placeholder='Enter Email' className={formik.touched.email && formik.errors.email ? "form-control is-invalid" : "form-control"} value={formik.values.email} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" />
                            <small className='text-danger'>{formik.touched.email ? formik.errors.firstname : ""}</small>
                        </div>
                        <div id='pass_container' className='form-group'>
                            <label htmlFor="">Password</label>
                            <input placeholder='Enter Password' className={formik.touched.password && formik.errors.password ? "form-control is-invalid" : "form-control"} value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} type={showPassword ? "text" : "password"} />
                            <button className='toggle-icon btn' type='button' onClick={() => setShowPassword(!showPassword)}>

                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                            <small className='text-danger'>{formik.touched.password ? formik.errors.firstname : ""}</small>
                        </div>
                
                        <button className='btn btn-primary' type='submit' disabled={loading}>
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                        <hr />
                        <p id='have'>Don't have an account? <Link to="/" style={{ textDecoration: "none", width: "100px", height: "40px", borderRadius: "6px", backgroundColor: "white", textAlign: "center", padding: "5px", color: "black" }}>Sign Up</Link></p>
                        <ToastContainer/>
                    </form>
                </div>
                <footer>
                    
                </footer>
            </div>

        </>

    )
}

export default Login