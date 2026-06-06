import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { CartContext } from "../../Context/CartContext";
import { UserContext } from '../../Context/UserContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';


export default function SpecificProducts() {
  let { setNumOfCartItems } = useContext(UserContext);
  let { addToCart } = useContext(CartContext);

  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isLoading, data } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: getFeaturedProducts,
  });

  async function getResponseCart(id) {
    let { data } = await addToCart(id);
    setNumOfCartItems(data.numOfCartItems);
    if (data.status === "success") {
      toast.success('Successfully created!')
    } else {
      toast.error('This is an error!');
    }
  }

  return (
    <div>
      {!isLoading ? (
        <div className="container text-center">
          <div className="d-block d-md-none">
            <h3 className="mb-2 text-center">My <span className="text-main">Products</span></h3>
          </div>
          <div className="mb-0 mb-md-3">
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              spaceBetween={10}
              breakpoints={{
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
              }}
            >
              {data.data.data.slice(1, 22).map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="cursor-pointer pb-5">
                    <div className="product shadow-sm rounded-2 p-3">
                      <Link to={`/products/productdetails/${product.id}`}>
                        <img className="w-100" src={product.imageCover} alt={product.title} />
                        <span className="text-main fw-bold">{product.category.name}</span>
                        <h3 className="h6">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                        <div className="d-flex justify-content-between mt-3">
                          <span>{product.price} EGP</span>
                          <span>
                            <i className="fa-solid fa-star rating-color"></i> {product.ratingsAverage}
                          </span>
                        </div>
                      </Link>
                      <button
                        onClick={() => getResponseCart(product.id)}
                        className="btn w-100 bg-main text-white border-0 rounded-2 p-1 mt-2"
                      >
                        add to cart
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Link to={"products"} className='text-center mb-2'>
            <button className='btn bg-main text-white px-5 py-2 fw-bolder'>Show More</button>
          </Link>
        </div>
      ) : (
        <div className="container container-loading d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fa-4x text-main"></i>
        </div>
      )}
    </div>
  );
}