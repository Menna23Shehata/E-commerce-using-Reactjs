import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../Utils/BaseUrl.js";

export let CartContext = createContext(0)

export default function CartContextProvider({ children }) {
    let [count, setCount] = useState(0)

    function addToCart(token, productId) {
        return axios.post(`${baseUrl}/cart`, { productId }, { headers: { token } })
            .then(data => data)
            .catch(error => error)
    }

    function getUserCart(token) {
        return axios.get(`${baseUrl}/cart`, { headers: { token } })
            .then(data => data)
            .catch(error => error)
    }


    function removeCartItem(token, productId) {
        return axios.delete(`${baseUrl}/cart/${productId}`, { headers: { token } })
            .then(data => data)
            .catch(error => error)
    }


    function clearCartItems(token) {
        return axios.delete(`${baseUrl}/cart`, { headers: { token } })
            .then(data => data)
            .catch(error => error)
    }


    function updateCartQty(token, productId, count) {
        return axios.put(`${baseUrl}/cart/${productId}`, { count }, { headers: { token } })
            .then(data => data)
            .catch(error => error)
    }

    function getCartCount() {
        let token = localStorage.getItem('token')
        axios.get(`${baseUrl}/cart`, { headers: { token } })
            .then(data => {
                console.log(data.data.numOfCartItems);
                setCount(data.data.numOfCartItems)
            })
            .catch(error => {
                console.log("error");
            })
    }


    useEffect(() => {
        getCartCount()
    }, [])


    return <CartContext.Provider value={{ addToCart, getUserCart, removeCartItem, clearCartItems, updateCartQty, getCartCount, count }}>
        {children}
    </CartContext.Provider>
}