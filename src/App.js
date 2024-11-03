import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout.jsx'
import HomePage from './Pages/HomePage.jsx'
import Products from './Components/Products/Products.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import Registeration from './Components/Registeration/Registeration.jsx'
import Login from './Components/Login/Login.jsx'
import { ToastContainer } from 'react-toastify';
import CartContextProvider from './Context/CartContext.js'
import Cart from './Components/Cart/Cart.jsx'
import Checkout from './Components/Checkout/Checkout.jsx'

export default function App() {

  let routes = createBrowserRouter([{
    path: '',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <Products /> },
      { path: "product-details/:id", element: <ProductDetails /> },
      { path: "register", element: <Registeration /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> }

    ]
  }])
  
  return (
    <>
      <ToastContainer theme='colored' />

      <CartContextProvider>
        <RouterProvider router={routes} />
      </CartContextProvider>

    </>
  )
}
