import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../Utils/BaseUrl.js'
import Product from '../Product/Product.jsx'
import Loading from '../Loading/Loading.jsx'

export default function Products() {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        let { data } = await axios.get(`${baseUrl}/products`)
        setProducts(data.data)
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
            <div className="container">
                {products.length !== 0 ? <div className="row">

                    <Product products={products} />

                </div>: <Loading/>}
                
            </div>
        </>
    )
}
