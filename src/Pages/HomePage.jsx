import React from 'react'
import MainSlider from '../Components/MainSlider/MainSlider.jsx'
import CategoriesSlider from '../Components/CategoriesSlider/CategoriesSlider.jsx'
import Products from '../Components/Products/Products.jsx'

export default function HomePage() {
    return (
        <>
            <MainSlider />
            <CategoriesSlider />
            <Products />
        </>
    )
}
