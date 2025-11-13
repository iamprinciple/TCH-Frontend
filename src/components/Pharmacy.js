import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const Pharmacy = () => {
  const { alluser } = useOutletContext()

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [pharm, setPharm] = useState([])
  const [isDisabled, setIsDisabled] = useState(false);

  // let userId = localStorage.getItem("id")
  let token = localStorage.getItem("keen")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("https://hospital-managemant-tch.onrender.com/user/get_products")
        // console.log(response.data.pharmacy);
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
    setIsDisabled(true)
    axios.post("https://hospital-managemant-tch.onrender.com/user/make_payment", { firstname: alluser.firstname, lastname: alluser.lastname, email: alluser.email, prod: product.prodName, price: product.price }, {
      headers: {
        "Authorization": `bearer ${token}`
      },
    }).then((res) => {
      // console.log(res);
      setIsDisabled(false)
      if (res.status) {
        window.location.href = res.data.data.authorization_url;
      }

    }).catch((err) => {
      setIsDisabled(false)
      console.log(err.response.data.message);
      setMessage(err.response.data.message)
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
            ) : pharm && pharm.length > 0 ? (
              <>
                {message && (
                  <div className="text-center my-2">
                    <strong className="text-secondary">{message}</strong>
                  </div>
                )}

                {pharm.map((oneProd, index) => (
                  <div
                    key={oneProd._id || index}
                    className="d-flex flex-row justify-content-between p-3 align-items-center border-bottom"
                  >
                  
                    <div className="d-flex flex-row align-items-center gap-3">
                      <strong>{index + 1}.</strong>
                      <img
                        src={oneProd.img}
                        alt={oneProd.prodName}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    <div className="d-flex flex-row gap-3 align-items-center">
                      <p style={{ fontSize: "18px", fontWeight: "500", margin: 0 }}>
                        {oneProd.prodName}
                      </p>
                      <p style={{ fontSize: "18px", fontWeight: "500", margin: 0 }}>
                        ₦{oneProd.price}
                      </p>
                    </div>
                    <button
                      className="btn btn-success"
                      onClick={() => handlePayment(oneProd)}
                      disabled={isDisabled}
                    >
                      {isDisabled ? "Loading..." : "Buy now"}
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <p style={{ color: "white" }}>No products at the moment! Check back later.</p>
            )}
          </div>
        </div>
      </div>

    </>
  )
}

export default Pharmacy