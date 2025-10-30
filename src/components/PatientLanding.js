import React, {useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import Sidenav from './Sidenav'
import { useDispatch, useSelector } from 'react-redux'
import { FetchingData, FetchingSuccess, FetchingError } from '../redux/Userslice'


const PatientLanding = () => {
    const dispatch = useDispatch()
    let {isfetching, alluser, fetcherror} = useSelector(state => state.userSlice)
   
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    let token = localStorage.getItem("keen")
    let userId = localStorage.getItem("id")

    useEffect(() => {
      dispatch(FetchingData())
      if (!userId || !token) {
        setError('user not found')
        localStorage.removeItem("keen");
        localStorage.removeItem("id");
        navigate("/login")
        return
      }
      axios.get(`https://hospital-managemant-tch.onrender.com/user/patient/${userId}`, {
        headers:{
          "Authorization": `bearer ${token}`,
      
        }
      }).then((res)=>{
        if (res?.data?.user) {
          dispatch(FetchingSuccess(res.data.user))
          // setUserData(res.data.user)
        }else{
          alert("Unauthorized Entry!!!")
          localStorage.removeItem("keen");
          localStorage.removeItem("id");
          navigate("/login")
        }
        
      
      }).catch((err)=>{
        // console.log(err);
        // alert("Forbidden entry!!!")
        localStorage.removeItem("keen");
        localStorage.removeItem("id");
        // if (err.response) {
        //   dispatch(FetchingError(err.message))
        // }else{
        //   dispatch(FetchingError(err.message))
        //   alert("Network error! Please check your connection and refresh page...");

        // }
        
        navigate("/login")
        
      })
    }, [token])
  return (
    <>
      <div className='d-flex flex-row justify-content-center align-items-center w-100'>
        <Sidenav/>
        <div className='w-100 '>
          {isfetching && <p>FETCHING DATA...</p>}
          {fetcherror && <p>{fetcherror}</p>}
          {error && <strong>{error}</strong>}
          <Outlet context={{alluser}}/>
        </div>
      </div>
        
    </>
  )
}

export default PatientLanding