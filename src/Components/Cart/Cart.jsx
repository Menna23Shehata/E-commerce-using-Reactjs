import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext.js'
import { notify } from '../../Utils/notify.js'
import Loading from '../Loading/Loading.jsx'
import { Link } from 'react-router-dom'

export default function Cart() {
    let { getUserCart, removeCartItem, clearCartItems, updateCartQty, getCartCount } = useContext(CartContext)

    let [cart, setCart] = useState([])
    let [totalPrice, setTotalPrice] = useState([])

    async function getCart() {

        let token = localStorage.getItem('token')
        if (token) {
            let response = await getUserCart(token)
            setCart(response.data.data.products)
            setTotalPrice(response.data.data.totalCartPrice)

            console.log(response);
        }
    }

    async function deleteProduct(productId) {

        let token = localStorage.getItem('token')
        if (token) {
            let response = await removeCartItem(token, productId)
            getCartCount()
            setCart(response.data.data.products)
            setTotalPrice(response.data.data.totalCartPrice)
            notify('Product Deleted Successfully', 'success')

            console.log(response);
        }
    }

    // async function deleteAllProducts() {

    //     let token = localStorage.getItem('token')
    //     if (token) {
    //         let response = await clearCartItems(token)
    //         setCart(response.data.data.products)
    //         setTotalPrice(response.data.data.totalCartPrice)

    //         console.log(response);
    //     }
    // }

    async function updateCart(productId, count) {

        let token = localStorage.getItem('token')
        if (token) {
            let response = await updateCartQty(token, productId, count)
            setCart(response.data.data.products)
            setTotalPrice(response.data.data.totalCartPrice)

            console.log(response);
        }
    }


    useEffect(() => {
        getCart()
    }, [])

    return (
        <>
            {cart.length !== 0 ? <div className="container">
                <div className="bg-main-light p-3 my-4 rounded-3 ">
                    <h4>Shopping Cart</h4>
                    {/* <i className="fa-solid fa-trash-can float-end fs-3" onClick={() => { deleteAllProducts() }}></i> */}
                    {/* <br /> */}
                    <h6 className='text-main my-3 fw-bold'>Total Cart Price : {totalPrice} EGP</h6>
                    {cart.map((item) => {
                        return <div key={item._id} className="row ">
                            <div className="col-md-2 gy-3">
                                <img src={item.product.imageCover} alt="" className='w-100 rounded-3 ' />
                            </div>
                            <div className="col-md-10 gy-3 d-flex justify-content-between">
                                <div>
                                    <h6>{item.product.title}</h6>
                                    <h6 className='text-main mx-2 fw-bolder'>{item.price} EGP</h6>
                                    <h6>{item.product.category.name}</h6>
                                    <button className='btn text-danger p-0 m-0' onClick={() => { deleteProduct(item.product._id) }}><i className="fa-solid fa-trash-can"></i> Remove Item</button>
                                </div>
                                <div>
                                    <button className='btn btn-outline-success' onClick={() => { updateCart(item.product._id, item.count - 1) }}><i className="fa-solid fa-minus"></i></button>
                                    <span className='fw-bolder text-main mx-3'>{item.count}</span>
                                    <button className='btn btn-outline-success' onClick={() => { updateCart(item.product._id, item.count + 1) }}><i className="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                    <Link to='/checkout' className='btn bg-main text-white text-uppercase mb-5'>checkout</Link>

            </div> : <Loading />}
        </>
    )
}
