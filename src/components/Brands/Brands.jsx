import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function BrandSlider() {

  function getBrandSlider() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { isLoading, data } = useQuery({
    queryKey: ["BrandSlider"],
    queryFn: getBrandSlider,
  });

  let Categories = data?.data.data;

  return (
    <div>
      <h2 className="fw-bolder my-4 text-center">
        Feature <span className="text-main" > Brands</span>
      </h2>
      {!isLoading ? (
        <div className="container">
          <div className="d-block d-md-none">
            <h3 className="mb-3 text-center">My <span className="text-main">Brands</span></h3>
          </div>
          <div className="row">
            {Categories.map((cat) => (
              <div className="col-md-2 shadow-sm p-5" key={cat._id}>
                <img
                  className="w-100"
                  src={cat.image}
                  alt={cat.name}
                />
                <p className="text-center mt-1">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : ""}
    </div>
  );
}