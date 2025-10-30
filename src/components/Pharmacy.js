import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const Pharmacy = () => {
  const { alluser } = useOutletContext()

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")
  const [pharm, setPharm] = useState([])
  const [isDisabled, setIsDisabled] = useState(false);

  // let userId = localStorage.getItem("id")
  let token = localStorage.getItem("keen")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("https://hospital-managemant-tch.onrender.com/user/get_products")
        console.log(response.data.pharmacy);
        if (response?.data?.pharmacy) {
          setPharm(response.data.pharmacy)
        } else {
          setError("No data found")
        }


      } catch (error) {
        console.log(error);
        if (error.response) {
          setError(`Server error: ${error.response.status} - ${error.response.data?.message || error.message}`);
        } else {
          setError(`${error.message}`)
        }

      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [])

  const handlePayment = async (product) => {
    //  console.log(product);
    setIsDisabled(true)
    if (!product) {
      alert("Selaect an item to purchase")

      return
    }
    axios.post("https://hospital-managemant-tch.onrender.com/user/make_payment", {firstname: alluser.firstname, lastname: alluser.lastname, email: alluser.email, prod: product.prodName, price: product.price }, {
      headers: {
        "Authorization": `bearer ${token}`
      },
    }).then((res) => {
      console.log(res);
      setIsDisabled(false)
      if (res.status) {
        window.location.href = res.data.data.authorization_url;
      }

    })
  }



  return (
    <>
      <div className='book'>
        <Link to='/patient'><button id='goBack'><FontAwesomeIcon icon={faArrowLeft} size='2x' /></button></Link>
        <div className='details'>
          <div className='doc_header'>
            <h2>Get your Prescription here</h2>
            <input type="text" placeholder='Search' />
          </div>
          <div>
            {loading ? (
              <p>LOADING...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : pharm.length > 0 ? (
              pharm.map((oneProd, index) => (
                <div key={oneProd._id} className='d-flex flex-row justify-content-between p-3 align-center'>
                  <div className='d-flex flex-row gap-3'>
                    <strong>{index + 1}</strong>
                    <img src={oneProd.img} alt='' style={{ width: "60px", height: "60px" }} />
                  </div>

                  <div className='d-flex flex-row gap-3'>

                    <p style={{fontSize:"20px", fontWeight:"500"}}>{oneProd.prodName}</p>
                    <p style={{fontSize:"20px", fontWeight:"500"}}>{oneProd.price}</p>
                  </div>


                  <button className='btn btn-success' onClick={() => handlePayment(oneProd)} disabled={isDisabled}>{isDisabled? "Loading..." : "Buy now"}</button>
                </div>
              ))
            ) : (
              <p style={{ color: "white" }}>No Product at the time! Check back later</p>

            )}

          </div>
        </div>
      </div>

    </>
  )
}

export default Pharmacy