import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';


const Paymentstatus = () => {
    const [searchParams] = useSearchParams()
    const reference = searchParams.get("reference")
    // const [status, setStatus] = useState("Verifying...")
    // const reference = new URLSearchParams(window.location.search).get('reference');
    console.log(reference);
    let userId = localStorage.getItem("id")
    useEffect(() => {
        if (reference) {
            const verifyPaymant = async () => {
                try {
                    const res = await axios.get(`https://hospital-managemant-tch.onrender.com/user/verify-payment/${reference}`,{params:{userId}});
                    // const data = res.data;
                    console.log(res.data);

                } catch (error) {
                    console.log(error);

                }
            }
            verifyPaymant()
        }else{
            alert("You must select a product")
        }


    }, [reference])
    return (
        <div className='pay_status'>
            <h1>Payment Successful!</h1>
            <div>
                <button><Link to={'/patient/records'}>View payment history</Link></button>
            </div>
            
        </div>
    )
}

export default Paymentstatus