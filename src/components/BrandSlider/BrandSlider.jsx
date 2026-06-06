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
      {!isLoading ? (
        <div className="container">
          <div className="d-block d-md-none">
            <h3 className="mb-3 text-center">My <span className="text-main">Brands</span></h3>
          </div>
          <Swiper
            style={{ paddingBottom: '20px' }}
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 1700, disableOnInteraction: false }}
            spaceBetween={10}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 3 },
              768: { slidesPerView: 5 },
              1024: { slidesPerView: 7 },
            }}
          >
            {Categories.map((cat) => (
              <SwiperSlide key={cat._id}>
                <img
                  className="w-100"
                  src={cat.image}
                  alt={cat.name}
                />
                <p className="text-center mt-1">{cat.name}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : ""}
    </div>
  );
}