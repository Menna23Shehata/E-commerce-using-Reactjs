import React, { useContext } from 'react'
import logo from '../../Images/freshcart-logo.svg'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext.js'

export default function Navbar() {
    let { count} = useContext(CartContext)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-main-light">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} alt="" />
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto my-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">Products</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/categories">Categories</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/brands">Brands</NavLink>
                            </li>

                        </ul>


                        <ul className="navbar-nav ms-auto my-2 mb-lg-0">

                            <NavLink type="button" className="btn me-3 position-relative border-0" to='/cart'>
                                Cart <i className="fa-solid fa-cart-shopping" />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                    {count}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </NavLink>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>


        </>
    )
}

