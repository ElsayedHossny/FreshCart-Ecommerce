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
      {!isLoading ? <div className="container"> <Slider {...settings}>
        {Categories.map((cat) => (
          <div key={cat._id}>
            <img height={200} className="w-100" src={cat.image} alt={cat._id} />
            <p className="text-center mt-1 font-sm">{cat.name}</p>
          </div>
        ))}
      </Slider>
      </div>

        : ""}
    </div>
  );
}
