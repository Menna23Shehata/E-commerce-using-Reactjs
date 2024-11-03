import React from 'react'
import Slider from "react-slick";
import slider1 from '../../Images/slider/banner_e-commerce1691474212.webp'
import slider2 from '../../Images/slider/noon1.png'
import slider3 from '../../Images/slider/dentures-auckland-confidentures-ed.jpg'
import slider4 from '../../Images/slider/E-com-Banner_Spring-with-love_1440x300.jpg'
import slider5 from '../../Images/slider/DSF_Web_1440x300.jpg'

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  return (
    <>
    <div className="my-3">
      <Slider {...settings}>
          <img src={slider1} alt=""  className='w-100'/>
          <img src={slider2} alt=""  className='w-100'/>
          <img src={slider3} alt="" className='w-100' />
          <img src={slider4} alt="" className='w-100' />          
          <img src={slider5} alt="" className='w-100' />

      </Slider>

    </div>
    </>
  )
}
