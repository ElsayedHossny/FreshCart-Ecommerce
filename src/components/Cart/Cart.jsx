import React, { useContext, useEffect, useState } from 'react'

import { CartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function Cart() {

  let { getLoggedUserCart, removeSpecificCartItem, updateCartProductQuantity, clearUserCart } = useContext(CartContext);
  const [Cart, setCart] = useState(null)
  const [isLoading, setIsLoading] = useState(true); // ✓ state للـ loading


  async function displayCartProduct() {
    // display All Products
    let { data } = await getLoggedUserCart();
    // لو الكارت فيه منتجات اعرضه، لو فاضي خليه null
    data.numOfCartItems > 0 ? setCart(data) : setCart(null);
    setIsLoading(false);
  }

  async function removeCartProduct(id) {
    let { data } = await removeSpecificCartItem(id);
    // after remove i want to update display Cart
    setCart(data);
    data.status === "success" ? toast.success('Successfully Remove!') : toast.error('Something went wrong');
  }

  async function UpdateCount(id, count) {
    let { data } = await updateCartProductQuantity(id, count);
    setCart(data);
    data.status === "success" ? toast.success('Updated success!') : toast.error('Something went wrong');
  }

  async function ClearAllCart() {
    let { data } = await clearUserCart();
    setCart(null); // ✓ فضي الكارت
    setIsLoading(false); // ✓ مش loading
    data.message === "success" ? toast.success('Remove All success!') : toast.error('Something went wrong');
  }

  useEffect(() => {
    displayCartProduct();
  }, [])


  return (

    <>
      <Helmet>
        <title> Cart | FreshCart</title>
        <meta name="description" content="Welcome to the home page of My Website." />
      </Helmet>

      {isLoading ? (
        // loading spinner
        <div className="container container-loading d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fa-4x text-main"></i>
        </div>
      ) : Cart ? (
        <div className="w-75 bg-light mx-auto mt-3 p-4">
          < h3 > Shopping Cart </h3 >
          <h6 className='text-main fw-bolder '  >Cart Items: {Cart.numOfCartItems}</h6>
          <h6 className='text-main fw-bolder mb-5'>Total Cart Price : {Cart.data.totalCartPrice} <span className="font-sm">EGP</span></h6>
          {
            Cart.data.products.map((product) =>
              <div className="row border-bottom p-4" key={product.product._id}>
                <div className="col-md-1">
                  <img className='w-100' src={product.product.imageCover} alt={product._id} />
                </div>
                <div className="col md-11 ">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className='h6'>{product.product.title.split(' ').slice(0, 8).join(' ')}</h3>
                      <h6 className=' text-main'>Price : {product.price} <span className="font-sm">EGP</span></h6>
                    </div>
                    <div>
                      <button onClick={() => UpdateCount(product.product._id, product.count + 1)} className='btn btn-outline-success btn-sm'>+</button>
                      <span className='mx-2'>{product.count}</span>
                      <button onClick={() => UpdateCount(product.product._id, product.count - 1)} className='btn btn-outline-success btn-sm'>-</button>
                    </div>
                  </div>
                  <button onClick={() => removeCartProduct(product.product._id)} className="btn btn-danger btn-sm mt-2"> <i className="fa-solid fa-trash-can"></i> Remove</button>
                </div>
              </div>
            )
          }
          <button onClick={ClearAllCart} className="w-100 btn btn-danger btn-sm mt-2"> <i className="fa-solid fa-trash-can"></i> Remove All Items</button>
        </div >
      ) : (
        <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
          <i className="fa-solid fa-cart-shopping fa-4x text-main mb-3"></i>
          <h3 className='text-main'>Cart Is Empty</h3>
        </div>
      )}
    </>
  )
}
