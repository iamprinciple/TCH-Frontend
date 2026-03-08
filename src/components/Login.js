import axios from 'axios';
import { useFormik } from 'formik'
import * as yup from "yup"
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import avatar from "../images/avatar.jpg"
import Footer from './Footer';


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
            <div className="w-full flex flex-col">
                <div className="min-h-screen grid lg:grid-cols-2">

                    <div className="hidden lg:flex flex-col justify-center items-center bg-blue-600 text-white p-12">

                        <div className="max-w-md text-center space-y-6">

                            <h1 className="text-4xl font-bold leading-tight">
                                The College Hospital
                            </h1>

                            <p className="text-blue-100 text-lg">
                                Effortless Care, Seamless Management.
                            </p>

                            <p className="text-blue-200">
                                Manage patient records, appointments, and healthcare services
                                efficiently with our modern hospital management system.
                            </p>

                            <div className="mt-10">
                                <img
                                    src={avatar}
                                    alt="Hospital"
                                    className="w-80 mx-auto"
                                />
                            </div>

                        </div>

                    </div>

                    <div className="flex items-center justify-center bg-slate-50 px-6 py-16">

                        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

                            <form onSubmit={formik.handleSubmit} className="space-y-6">

                                <div className="text-center">
                                    <h2 className="text-3xl font-bold text-slate-800">
                                        Welcome Back
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Log in to your account
                                    </p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Email
                                    </label>

                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.email && formik.errors.email
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />

                                    {formik.touched.email && (
                                        <small className="text-red-500 text-sm">
                                            {formik.errors.email}
                                        </small>
                                    )}
                                </div>



                                <div className="flex flex-col gap-1 relative">
                                    <label className="text-sm font-medium text-gray-700">
                                        Password
                                    </label>

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.password && formik.errors.password
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>

                                    {formik.touched.password && (
                                        <small className="text-red-500 text-sm">
                                            {formik.errors.password}
                                        </small>
                                    )}
                                </div>


                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
                                >
                                    {loading ? "Logging in..." : "Log In"}
                                </button>

                                <p className="text-center text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/"
                                        className="text-blue-600 font-semibold hover:underline"
                                    >
                                        Sign Up
                                    </Link>
                                </p>

                                <ToastContainer />

                            </form>

                        </div>

                    </div>

                </div>
               <Footer/>                  
            </div>

        </>

    )
}

export default Login