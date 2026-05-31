import React, { useContext, useEffect, useState } from "react";
import Style from "./FeatureProducts.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import toast from 'react-hot-toast';
import { CartContext } from "../../Context/CartContext";

export default function FeatureProducts() {

  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { isLoading, data } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: getFeaturedProducts,
    // gcTime: 3000,
    // refetchOnMount: false,
    // staleTime: 1000,
    // refetchInterval: 1000
  });


  let { addToCart } = useContext(CartContext);
  async function getResponseCart(id) {
    let { data } = await addToCart(id);
    if (data.status === "success") {
      toast.success('Successfully created!')
    } else {
      toast.error('This is an error!');
    }
  }

  return <div>
    <h1 className="mb-1">Feature Products</h1>
    {!isLoading ? (
      <div className="container">
        <div className="row">
          {data.data.data.map((product) => (
            <div className="col-md-2 cursor-pointer" key={product.id}>
              <div className="product p-3">
                <Link to={`productdetails/${product.id}`}>
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
        </div>
      </div>
    ) : (
      <div className="container container-loading d-flex justify-content-center align-items-center">
        <i className="fa-solid fa-spinner fa-spin fa-4x text-main"></i>
      </div>
    )}
  </div>
}
