import React, { useState } from 'react'
import MoreInfo from './MoreInfo'
import DocMain from './DocMain'
import { useSelector } from 'react-redux'

const DoctorLanding = () => {
  const  allDoctor  = useSelector((state)=> state.doctorSlice.allDoctor)
  // console.log(allDoctor);
  
  const isProfileComplete = allDoctor?.specialization && allDoctor?.experience;

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const showDocMain = isProfileComplete || updateSuccess

  return (
    <>

      {showDocMain? (
        <DocMain/>
      ):(
        <MoreInfo onUpdateSuccess={()=> setUpdateSuccess(true)}/>
      )
      }

    </>
  )
}

export default DoctorLanding