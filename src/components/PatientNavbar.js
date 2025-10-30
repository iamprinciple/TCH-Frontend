import React from 'react'
import { useNavigate } from 'react-router-dom'

const PatientNavbar = ({user}) => {
  const navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.removeItem("keen")
    localStorage.removeItem("id")
    navigate("/login")
  }
  return (
    <>
        <div style={{ width:"100%", borderBottom:"2px solid black", display:"flex", flexDirection:"row", justifyContent:"space-between", backgroundColor:"yellow"}}>
            <h3 style={{fontSize:"20px", fontWeight:"700", fontFamily:"sans-serif", width:"250px", height:"100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px",  textAlign: "center",  lineHeight: "100px",  backgroundColor: "#3498db", color: "#fff",padding:"5px"}}>The College Hospital</h3>
            <div >
              
              {user && (
                <div>
                  <div>
                    <h2>here</h2>
                    <h2>here</h2>
                  </div>
                  <div style={{display:"flex", flexDirection:"row", backgroundColor:"red", gap:"8px", justifyContent:"center", alignItems:"center"}}>
                    <img src={user.image} alt="Profile"  style={{ width: '40px', height: '40px', borderRadius: '50%' }}/>
                    <p>{user.firstname}</p>
                  </div>

                </div>
                
              )}
              <button onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    </>
  )
}

// export default PatientNavbar