import React from "react";
import Style from "./CategorySlider.module.css";



import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 7,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // mobile
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

  };


  function getCategorySlider() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { isLoading, data } = useQuery({
    queryKey: ["CategorySlider"],
    queryFn: getCategorySlider,
  })

  let Categories = data?.data.data;
  return (
    <div>
      {!isLoading ? <div className="container">
        <div className="d-block d-md-none">
          <h3 className="mb-3 text-center">My <span className="text-main">Category</span></h3>
        </div>
        <Slider {...settings}>
          {Categories.map((cat) => (
            <div key={cat._id}>
              {/* Desktop — يظهر من 768px وأكبر */}
              <img height={200} className="w-100 d-none d-md-block" src={cat.image} alt={cat._id} />

              {/* Mobile — يظهر أقل من 768px بس */}
              <img height={400} className="w-100 d-block d-md-none" src={cat.image} alt={cat._id} />
              <p className="text-center mt-1 font-sm">{cat.name}</p>
            </div>
          ))}
        </Slider>
      </div>

        : ""}
    </div>
  );
}
