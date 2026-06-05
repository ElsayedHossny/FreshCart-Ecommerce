import React, { useContext } from "react";
import Style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Slider from "react-slick";
import toast from 'react-hot-toast';
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";

export default function ProductDetails() {
  let { id } = useParams();

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  let { isPending, data } = useQuery({
    queryKey: ['productDetails'],
    queryFn: () => getProductDetails(id),
  })

  let product = data?.data.data;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  let { addToCart } = useContext(CartContext);

  let { setNumOfCartItems } = useContext(UserContext);


  async function getResponseCart(id) {
    let { data } = await addToCart(id);
    setNumOfCartItems(data.numOfCartItems);
    if (data.status === "success") {
      toast.success('Successfully created!')
    } else {
      toast.error('This is an error!');
    }
  }


  return <>
    {!isPending ?
      <div className="row align-items-center mt-5 p-4 gap-5 gap-sm-0">
        <div className="col-md-4">
          <div className="slider-container">
            <Slider {...settings}>
              {product.images.map((image) =>
                <img className="w-100" src={image} alt={product.title} />
              )}
            </Slider>
          </div>

        </div>
        <div className="col-md-8">
          <h2>{product.title}</h2>
          <p className="text-muted mb-4 small"> {product.description}</p>
          <h6 className="text-main">{product.category.name}</h6>
          <h6 className="text-main mb-4">Price : {product.price} EGY</h6>
          <div className="d-flex justify-content-between" >
            <span>ratingsQuantity: {product.ratingsQuantity}</span>
            <span><i className="fa-solid fa-star rating-color"></i> {product.ratingsAverage}</span>
          </div>
          <button onClick={() => getResponseCart(product.id)} className="w-100 btn bg-main text-white mt-4" >Add to Cart</button>



        </div>
      </div>
      : <div className="container container-loading d-flex justify-content-center align-items-center">
        <i className="fa-solid fa-spinner fa-spin fa-4x text-main"></i>
      </div>}
  </>;
}





