
import React, { useContext } from "react";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import toast from 'react-hot-toast';
import { CartContext } from "../../Context/CartContext";

import Slider from "react-slick";
import { UserContext } from '../../Context/UserContext';


var settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 5,
  slidesToScroll: 2,

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
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};


export default function SpecificProducts() {
  let { setNumOfCartItems } = useContext(UserContext);

  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { isLoading, data } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: getFeaturedProducts,
  });


  let { addToCart } = useContext(CartContext);
  async function getResponseCart(id) {
    let { data } = await addToCart(id);
    setNumOfCartItems(data.numOfCartItems);
    if (data.status === "success") {
      toast.success('Successfully created!')
    } else {
      toast.error('This is an error!');
    }
  }

  return <div>

    {!isLoading ? (
      <div className="container text-center">
        <div className="d-block d-md-none">
          <h3 className="mb-2 text-center">My <span className="text-main">Products</span></h3>
        </div>
        <div className="row mb-0 mb-md-5">
          <Slider {...settings}>
            {data.data.data.slice(1, 22).map((product) => (

              <div className="cursor-pointer pb-5" key={product.id}>
                <div className="product shadow-sm me-2 rounded-2 p-3">
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
                  <button onClick={() => getResponseCart(product.id)} className="btn w-100 bg-main text-white border-0 rounded-2 p-1 mt-2">
                    add to cart
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <Link to={"products"} className='text-center mb-2'>
          <button className='btn bg-main text-white px-5 py-2 fw-bolder'>Show More</button>
        </Link>
      </div>
    ) : (
      <div className="container container-loading d-flex justify-content-center align-items-center">
        <i className="fa-solid fa-spinner fa-spin fa-4x text-main"></i>
      </div>
    )
    }

  </div >
}
