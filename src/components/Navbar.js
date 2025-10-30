import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/TCHlogo-removebg-preview.png'

const Navbar = () => {
  return (
    <nav>
      <div style={{width:"80%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/">
          <img src={logo} alt="The College Hospital Logo" width="200" height="180px" />
        </Link>
        
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <Link to="/login" style={{ textDecoration: "none", width: "auto", borderRadius: "6px", backgroundColor: "silver", textAlign: "center", padding: "5px", color: "#3498db", fontWeight:"700", fontSize:"20px" }}> Log In </Link>
        </div>
      </div>

    </nav>
  )
}

export default Navbar