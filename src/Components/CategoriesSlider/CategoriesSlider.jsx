import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../Utils/BaseUrl.js'
import Slider from "react-slick";


export default function CategoriesSlider() {
  const [categories, setCategories] = useState([])

  const getAllCategories = async () => {
    let { data } = await axios.get(`${baseUrl}/categories`)
    setCategories(data.data);
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    autoplay:true
  };

  return (
    <div>
      <div className="my-5 container">
        <h3 className='mb-2'>Shop Popular Categories</h3>

        <Slider {...settings} autoplaySpeed={3500}>
          {categories.map((item) => {
            return <div key={item._id}>
              <img src={item.image} alt="" className='w-100' height={250} />
              <h6 className='mt-2 text-center'>{item.name}</h6>
            </div>
          })}
        </Slider>

      </div>

    </div>
  )
}
