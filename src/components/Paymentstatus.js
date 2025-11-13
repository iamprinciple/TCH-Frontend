import axios from 'axios';
import React, { useEffect} from 'react'
import { Link, useSearchParams } from 'react-router-dom';


const Paymentstatus = () => {
    const [searchParams] = useSearchParams()
    const reference = searchParams.get("reference")
    // const [status, setStatus] = useState("Verifying...")
    // const reference = new URLSearchParams(window.location.search).get('reference');
    // console.log(reference);
    let userId = localStorage.getItem("id")
    useEffect(() => {
        if (reference) {
            const verifyPaymant = async () => {
                try {
                    await axios.get(`https://hospital-managemant-tch.onrender.com/user/verify-payment/${reference}`,{params:{userId}});
                   
                } catch (error) {
                    console.log(error);

                }
            }
            verifyPaymant()
        }else{
            alert("You must select a product")
        }


    }, [reference, userId])
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