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
import avatar from "../images/avatar.jpg"
import hospital from "../images/hospital.jpg"
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from "react-toastify"
import Footer from './Footer'

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
        validationSchema: yup.object({
            firstname: yup.string().trim().min(3, "Firstname is too short").required("Firstname is required"),
            lastname: yup.string().trim().min(3, "Lastname is too short").required("Lastname is required"),
            email: yup.string().trim().email("Invalid Email").required("Email is required"),
            password: yup.string().trim().matches(`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])`, "Password must contain at least one Uppercase letter, one Lower letter and one digit").required("Password is required")
        }),
        onSubmit: async (value) => {
            setLoading(true)
            try {
                await axios.post("https://hospital-managemant-tch.onrender.com/user/signup", value)
                toast.success("signup successful ✅", {
                    onClose: () => navigate('/login'),
                    autoClose: 3000
                })


            } catch (error) {
                toast.error(error.response?.data?.message)
            } finally {
                setLoading(false)

            }

        }
    })

    return (
        <>
            <Navbar />
            <div className="w-full flex flex-col">

                <section className="w-full min-h-[500px] bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center justify-center px-6 py-20">
                    <div className="max-w-7xl w-full">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            The College Hospital
                            <br />
                            <span className="text-blue-100 text-3xl md:text-4xl font-medium">
                                Effortless Care,
                                <br />
                                Seamless Management
                            </span>
                        </h1>
                    </div>
                </section>
                <section className="bg-red-600 text-white py-6 px-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

                        <div>
                            <h2 className="text-xl font-bold">Medical Emergency?</h2>
                            <p className="text-sm opacity-90">
                                Our emergency department is available 24/7.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold">Call: +234 800 000 0000</span>

                            <button className="bg-white text-red-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
                                Get Help Now
                            </button>
                        </div>

                    </div>
                </section>

                <section className="w-full max-w-7xl mx-auto px-6 py-20">

                    <h5 className="text-blue-600 font-semibold mb-2">Departments</h5>

                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-800">
                            Health Care Services
                        </h2>

                        <button className="text-blue-600 text-lg hover:underline">
                            More Services +
                        </button>
                    </div>

                    <div
                        data-aos="zoom-in"
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                    >

                        <div className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition">
                            <img src={ger} alt="GERIATRIC CARE" className="mx-auto mb-3 h-16" />
                            <h3 className="font-semibold text-sm text-slate-700">GERIATRIC CARE</h3>
                        </div>

                        <div className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition">
                            <img src={cardio} alt="CARDIOTHORACIC" className="mx-auto mb-3 h-16" />
                            <h3 className="font-semibold text-sm text-slate-700">CARDIOTHORACIC</h3>
                        </div>

                        <div className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition">
                            <img src={derma} alt="DERMATOLOGIST" className="mx-auto mb-3 h-16" />
                            <h3 className="font-semibold text-sm text-slate-700">DERMATOLOGIST</h3>
                        </div>

                        <div className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition">
                            <img src={lyr} alt="LAPAROSCOPY" className="mx-auto mb-3 h-16" />
                            <h3 className="font-semibold text-sm text-slate-700">LAPAROSCOPY</h3>
                        </div>

                        <div className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition">
                            <img src={radio} alt="RADIOLOGY" className="mx-auto mb-3 h-16" />
                            <h3 className="font-semibold text-sm text-slate-700">RADIOLOGY</h3>
                        </div>

                        <div className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition">
                            <img src={nuclear} alt="NUCLEAR MEDICINE" className="mx-auto mb-3 h-16" />
                            <h3 className="font-semibold text-sm text-slate-700">NUCLEAR MEDICINE</h3>
                        </div>

                    </div>

                </section>
                <section className="py-20 px-6 bg-gray-50">
                    <div className="max-w-7xl mx-auto">

                        <h2 className="text-3xl font-bold text-center mb-12">
                            Meet Our Specialists
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
                                <img
                                    src={hospital}
                                    alt="Doctor"
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="font-semibold text-lg">Dr. Sarah Johnson</h3>
                                <p className="text-sm text-gray-500">Cardiologist</p>

                                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Book Appointment
                                </button>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
                                <img
                                    src={hospital}
                                    alt="Doctor"
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="font-semibold text-lg">Dr. Michael Lee</h3>
                                <p className="text-sm text-gray-500">Dermatologist</p>

                                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Book Appointment
                                </button>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
                                <img
                                    src={hospital}
                                    alt="Doctor"
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="font-semibold text-lg">Dr. Emily Carter</h3>
                                <p className="text-sm text-gray-500">Radiologist</p>

                                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Book Appointment
                                </button>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
                                <img
                                    src={hospital}
                                    alt="Doctor"
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="font-semibold text-lg">Dr. James Brown</h3>
                                <p className="text-sm text-gray-500">Neurologist</p>

                                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Book Appointment
                                </button>
                            </div>

                        </div>

                    </div>
                </section>

                <section className="bg-blue-50 py-16 text-center px-6">

                    <h4
                        data-aos="fade-right"
                        className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6"
                    >
                        Trust Us To Be There To Help All & Make Things Well Again.
                    </h4>

                    <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                        Join Us Today!
                    </button>

                </section>
                <section className="py-20 px-6 bg-gray-50">
                    <div className="max-w-7xl mx-auto text-center">

                        <h2 className="text-3xl font-bold mb-12">
                            What Our Patients Say
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">

                            <div className="bg-white p-6 rounded-xl shadow">
                                <p className="text-gray-600 mb-4">
                                    “The doctors here are incredibly caring and professional.
                                    I received the best treatment possible.”
                                </p>
                                <h4 className="font-semibold">Adebayo Samuel</h4>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow">
                                <p className="text-gray-600 mb-4">
                                    “Booking an appointment was simple and the staff were
                                    very friendly throughout my visit.”
                                </p>
                                <h4 className="font-semibold">Grace Williams</h4>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow">
                                <p className="text-gray-600 mb-4">
                                    “Excellent facilities and experienced doctors.
                                    Highly recommend this hospital.”
                                </p>
                                <h4 className="font-semibold">John Okeke</h4>
                            </div>

                        </div>

                    </div>
                </section>
                <div className='min-h-screen grid lg:grid-cols-2'>
                    <section className="flex justify-center px-6 py-20">

                        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

                            <h2 className="text-2xl font-bold text-center mb-6">
                                Create Account
                            </h2>

                            <form onSubmit={formik.handleSubmit} className="space-y-4">

                                {/* FIRSTNAME */}
                                <div>
                                    <label className="text-sm font-medium">Firstname</label>
                                    <input
                                        name="firstname"
                                        placeholder="Enter Firstname"
                                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                                        value={formik.values.firstname}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.firstname && (
                                        <small className="text-red-500">{formik.errors.firstname}</small>
                                    )}
                                </div>


                                {/* LASTNAME */}
                                <div>
                                    <label className="text-sm font-medium">Lastname</label>
                                    <input
                                        name="lastname"
                                        placeholder="Enter Lastname"
                                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                                        value={formik.values.lastname}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.lastname && (
                                        <small className="text-red-500">{formik.errors.lastname}</small>
                                    )}
                                </div>


                                {/* EMAIL */}
                                <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <input
                                        name="email"
                                        placeholder="Enter Email"
                                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>


                                {/* ROLE */}
                                <div>
                                    <label className="text-sm font-medium">Role</label>
                                    <select
                                        name="role"
                                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                    >
                                        <option value="">Select option</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Patient">Patient</option>
                                    </select>
                                </div>


                                {/* PASSWORD */}
                                <div className="relative">
                                    <label className="text-sm font-medium">Password</label>

                                    <input
                                        name="password"
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        className="w-full border rounded-lg px-3 py-2 mt-1 pr-10 focus:ring-2 focus:ring-blue-500"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-9 text-gray-500"
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>


                                {/* SUBMIT */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    {loading ? "Loading..." : "Sign Up"}
                                </button>

                                <hr />

                                <p className="text-center text-sm">
                                    Have an account?{" "}
                                    <Link to="/login" className="text-blue-600 font-semibold">
                                        Log In
                                    </Link>
                                </p>

                                <ToastContainer />

                            </form>

                        </div>

                    </section>
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
                </div>

                <Footer />

            </div>

        </>
    )
}

export default Signin