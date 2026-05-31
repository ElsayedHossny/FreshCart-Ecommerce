import React from "react";
import img1 from "../../images/slider-image-1.jpeg"
import img2 from "../../images/slider-image-2.jpeg"
import img3 from "../../images/slider-image-3.jpeg"
import bolg1 from "../../images/grocery-banner.png"
import blog2 from "../../images/grocery-banner-2.jpeg"


import Slider from "react-slick";

export default function MainSlider() {



  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return <div>
    <div className="row" >
      <div className="col-md-9 ">
        <Slider {...settings}>
          <img height={400} className="w-100 " src={img1} alt="" />
          <img height={400} className="w-100" src={img2} alt="" />
          <img height={400} className="w-100" src={img3} alt="" />
        </Slider>
      </div>
      <div className="col-md-3 p-0 d-flex flex-column gap-1">
        <img height={198} className="w-100 cover-full" src={bolg1} alt="" />
        <img height={198} className="w-100 cover-full" src={blog2} alt="" />
      </div>
    </div>
  </div>

}

