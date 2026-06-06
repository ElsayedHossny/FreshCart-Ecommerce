import React from "react";
import img1 from "../../images/slider-image-1.jpeg"
import img2 from "../../images/slider-image-2.jpeg"
import img3 from "../../images/slider-image-3.jpeg"
import bolg1 from "../../images/grocery-banner.png"
import blog2 from "../../images/grocery-banner-2.jpeg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';

export default function MainSlider() {

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-md-9">
          <Swiper
            style={{ paddingBottom: '40px' }}
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            spaceBetween={10}
          >
            <SwiperSlide><img height={400} className="w-100" style={{ objectFit: 'cover' }} src={img1} alt="" /></SwiperSlide>
            <SwiperSlide><img height={400} className="w-100" style={{ objectFit: 'cover' }} src={img2} alt="" /></SwiperSlide>
            <SwiperSlide><img height={400} className="w-100" style={{ objectFit: 'cover' }} src={img3} alt="" /></SwiperSlide>
          </Swiper>
        </div>
        <div className="d-none d-md-flex col-md-3 p-0 flex-column gap-1">
          <img height={198} className="w-100" style={{ objectFit: 'cover' }} src={bolg1} alt="" />
          <img height={198} className="w-100" style={{ objectFit: 'cover' }} src={blog2} alt="" />
        </div>
      </div>
    </div>
  );
}