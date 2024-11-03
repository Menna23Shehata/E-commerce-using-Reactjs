import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../Utils/BaseUrl.js'
import { CartContext } from '../../Context/CartContext.js'
import Loading from '../Loading/Loading.jsx'
import { notify } from '../../Utils/notify.js'

export default function ProductDetails() {
    let { addToCart } = useContext(CartContext)
    async function addProduct(productId) {
        let token = localStorage.getItem('token')

        if (token) {
            await addToCart(token, productId)
            notify("Product added successfully to your cart", "success")
        } else {
            notify("you are not logged in", "error")
        }
    }

    let { id } = useParams()

    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])

    const getProduct = async () => {
        let { data } = await axios.get(`${baseUrl}/products/${id}`)
        setProduct(data.data)
        setCategory(data.data.category)
    }

    useEffect(() => {
        getProduct()
        // eslint-disable-next-line
    }, [])


    return (
        <>
            {product.length !== 0 ? <div className="container my-5">
                <div className="row d-flex justify-content-between align-items-center">
                    {/* <div className="col-md-2"></div> mtnsee4 ta5dy l cols bto3o mn a5wato*/}
                    <div className="col-md-4">
                        <img src={product.imageCover} className='w-75' alt="" />

                    </div>
                    <div className="col-md-8">

                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <h6 className='text-main'>{category.name}</h6>

                        <div className="d-flex justify-content-between align-products-center my-4">
                            <span>{product.price} EGP</span>
                            <div>
                                <i className='fas fa-star rating-color'></i>
                                <span> {product.ratingsAverage}</span>
                            </div>
                        </div>

                        <button className='btn bg-main text-white text-capitalize w-100' onClick={() => { addProduct(product._id) }}><i className="fa-solid fa-plus text-white"></i> add to cart</button>
                    </div>
                </div>
            </div>: <Loading/>}
        </>
    )
}
