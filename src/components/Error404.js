import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


const Error404 = () => {
    const navigate = useNavigate()
    const goHome =() =>{
      localStorage.removeItem("keen");
      localStorage.removeItem("id");
      navigate('/')
    }
  return (
    <div style={{width:"100%", height:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <h1 className='text-danger'>Error 404 page!</h1>
        <div className="d-flex flex-column align-items-center">
            <h5>You are lost. Go Home</h5>
            <button onClick={goHome}>
              <FontAwesomeIcon icon={faHome} size='2x' />
            
            </button>
        </div>
        
    </div>
  )
}

export default Error404