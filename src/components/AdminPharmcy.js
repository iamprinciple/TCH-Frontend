import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const AdminPharmcy = () => {
    const [prodName, setprodName] = useState("")
    const [img, setImg] = useState("")
    const [price, setPrice] = useState("")
    const [qty, setQty] = useState("")
    const [allProducts, setallProducts] = useState([])

    const [editProductId, setEditProductId] = useState(null);
    const [editValues, setEditValues] = useState({
        prodName: "",
        qty: "",
        price: "",
    });

    const handleChange = (e) => {
        let imageFile = e.target.files[0]
        let reader = new FileReader()
        reader.onload = (e) => {
            setImg(e.target.result)
        }
        reader.readAsDataURL(imageFile)
    }
    const postProd = async () => {
        try {
            if (!prodName || !img || !price || !qty) {
                alert("Fields cannot be empty")
                return
            }
            if (price <= 0 || qty <= 0) {
                alert("Figures cant be less than 0!")
                return
            }
            const response = await axios.post("https://hospital-managemant-tch.onrender.com/admin/post_item", { prodName, img, price, qty })
            // console.log(response.data.products);
            if (response.status === 200) {
                alert("Posted Successfully")
                const newProd = response.data.products
                setallProducts((prev) => [...prev, newProd])
                setprodName("");
                setImg("");
                fileRef.current.value = null
                setPrice("");
                setQty("");
            } else {
                alert("Cannot post product")
            }
        } catch (error) {
            // console.log(error);

        }


    }
    useEffect(() => {
        const getProd = async () => {
            try {
                const response = await axios.get("https://hospital-managemant-tch.onrender.com/admin/get_products")
                // console.log(response.data.pharmacy);
                if (response) {
                    setallProducts(response.data.pharmacy)
                }

            } catch (error) {
                // console.log(error);

            }


        }
        getProd()
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return
        try {
            const response = await axios.delete(`https://hospital-managemant-tch.onrender.com/admin/delete_product/${id}`)
            if (response.status === 200) {
                toast.success("Product deleted successfully")
                setallProducts((prev) => prev.filter((prod) => prod.id !== id))
            } else {
                toast.error("Failed to delete")
            }

        } catch (error) {
            // console.log(error);
            toast.error(error)

        }
    }
    const handleEditClick = (product) => {
        setEditProductId(product._id)
        setEditValues({
            prodName: product.prodName,
            qty: product.qty,
            price: product.price
        })
    }


    const handleCancel = () => {
        setEditProductId(null);
        setEditValues({ prodName: "", qty: "", price: "" });
    };
    const editting = (e) => {
        setEditValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSave = async (id) => {
        try {
            const res = await axios.put(`https://hospital-managemant-tch.onrender.com/admin/update_product/${id}`, editValues);
            if (res.status === 200) {
                toast.success("Product updated successfully")

                setallProducts((prev) => prev.map((prod) => prod._id === id? {...prod, ...editValues} : prod))
                setEditProductId(null)
            }
        } catch (error) {
            toast.error("Error updating product")
        }
    }

    const fileRef = useRef(null)

    return (
        <>
            <div className='d-flex flex-column gap-2 p-3 align-items-center w-100 h-100'>
                <h2>Upload Products</h2>
                <div>

                </div>
                <div className='w-50 mx-auto shadow'>
                    <div>
                        <label htmlFor="">Item Picture</label>
                        <input className='form-control' onChange={(e) => handleChange(e)} ref={fileRef} type="file" />
                    </div>
                    <div>
                        <label htmlFor="">Item Name</label>
                        <input className='form-control' value={prodName} onChange={(e) => setprodName(e.target.value)} type="text" />
                    </div>
                    <div>
                        <label htmlFor="">Price</label>
                        <input className='form-control' value={price} onChange={(e) => setPrice(e.target.value)} type="text" />
                    </div>
                    <div>
                        <label htmlFor="">Quantity</label>
                        <input className='form-control' value={qty} onChange={(e) => setQty(e.target.value)} type="number" />
                    </div>
                    <button className='btn btn-dark' onClick={postProd}>Post Now</button>
                </div>
                <div className='products'>
                    {allProducts.length > 0 ? (
                        allProducts.map((oneProd) => (
                            <div className='prod'>
                                {editProductId === oneProd._id ? (
                                    <>
                                        <input type="text" name='prodName' value={editValues.prodName} onChange={editting} />
                                        <input type="text" name='qty' value={editValues.qty} onChange={editting} />
                                        <input type="text" name='price' value={editValues.price} onChange={editting} />
                                        <div>
                                            <button className='btn btn-success btn-sm me-2' onClick={() => handleSave(oneProd._id)}>Save</button>
                                            <button className='btn btn-danger btn-sm me-2' onClick={handleCancel}>Cancel</button>
                                        </div>
                                    </>

                                ) : (
                                    <>
                                        <p>Product Name: {oneProd.prodName}</p>
                                        <p>Quantity: {oneProd.qty}</p>
                                        <div>
                                            <button className='btn btn-primary' onClick={() => handleEditClick(oneProd)}>Edit</button>
                                            <button className='btn btn-danger' onClick={() => handleDelete(oneProd._id)}>Delete</button>
                                        </div>
                                    </>

                                )}

                            </div>
                        ))
                    ) : (
                        <p>Fetching products...</p>
                    )}
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default AdminPharmcy