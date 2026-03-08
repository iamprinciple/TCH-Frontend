import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/TCHlogo-removebg-preview.png'

const Navbar = () => {
  return (
    <nav className="w-full h-[110px] sticky top-0 z-[1000] backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-sm flex justify-center items-center">

      <div className="w-full max-w-7xl px-6 md:px-12 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="The College Hospital Logo"
            className="w-20 h-20 object-contain"
          />
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold text-slate-800">
              The College Hospital
            </h1>
            <p className="text-sm text-slate-500 tracking-wide">
              Care • Trust • Excellence
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-6">

          {/* Optional Nav Links */}
          {/* <div className="hidden md:flex items-center gap-6 text-slate-600 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-600 transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-blue-600 transition">
              Contact
            </Link>
          </div> */}

          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition duration-300"
          >
            Log In
          </Link>

        </div>

      </div>
    </nav>
  )
}

export default Navbar