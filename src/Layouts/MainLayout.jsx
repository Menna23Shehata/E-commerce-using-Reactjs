import React from 'react'
import Navbar from '../Components/Navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}
