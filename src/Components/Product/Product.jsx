import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext.js'
import { notify } from '../../Utils/notify.js'

export default function Product({ products }) {
    let { addToCart, getCartCount } = useContext(CartContext)

    async function addProduct(productId) {
        let token = localStorage.getItem('token')

        if(token){
            await addToCart(token , productId)
            getCartCount()
            notify("Product added successfully to your cart","success")
        }else{
            notify("you are not logged in","error")
        }
    }

    return (
        <>
            {products.map((item) => {
                return <div className="col-md-2 g-4" key={item._id}>
                    <div className="product">
                        <Link to={"/product-details/" + item._id}>

                            <img src={item.imageCover} alt="" className='w-100' />
                            <h6 className='text-main'>{item.category.name}</h6>
                            <p className='fw-bolder'>{item.title.split(' ').slice(0, 2).join(' ')}</p>
                            <div className="d-flex justify-content-between align-items-center my-4">
                                <span>{item.price} EGP</span>
                                <div>
                                    <i className='fas fa-star rating-color'></i>
                                    <span> {item.ratingsAverage}</span>
                                </div>
                            </div>
                        </Link>

                            <button className='btn bg-main text-white text-capitalize w-100' onClick={()=>{addProduct(item._id)}}>add to cart</button>

                    </div>
                </div>
            })}
        </>
    )
}
