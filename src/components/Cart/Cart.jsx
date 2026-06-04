import React, { useContext, useEffect, useState } from 'react'

import { CartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Cart() {

  let { setCartID, setNumOfCartItems } = useContext(UserContext);
  let { getLoggedUserCart, removeSpecificCartItem, updateCartProductQuantity, clearUserCart } = useContext(CartContext);
  const [Cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  async function displayCartProduct() {
    let { data } = await getLoggedUserCart();
    setNumOfCartItems(data.numOfCartItems);
    setCartID(data.cartId);
    data.numOfCartItems > 0 ? setCart(data) : setCart(null);
    setIsLoading(false);
  }

  async function removeCartProduct(id) {
    let { data } = await removeSpecificCartItem(id);
    setNumOfCartItems(data.numOfCartItems);
    data.numOfCartItems > 0 ? setCart(data) : setCart(null);
    data.status === "success" ? toast.success('Successfully Remove!') : toast.error('Something went wrong');
  }

  async function UpdateCount(id, count) {
    let { data } = await updateCartProductQuantity(id, count);
    setNumOfCartItems(data.numOfCartItems);
    setCart(data);
    data.status === "success" ? toast.success('Updated success!') : toast.error('Something went wrong');
  }

  async function ClearAllCart() {
    let { data } = await clearUserCart();
    setNumOfCartItems(data.numOfCartItems);
    setCart(null);
    setIsLoading(false);
    data.message === "success" ? toast.success('Remove All success!') : toast.error('Something went wrong');
  }

  useEffect(() => {
    displayCartProduct();
  }, [])

  return (
    <>
      <Helmet>
        <title>Cart | FreshCart</title>
        <meta name="description" content="Welcome to the home page of My Website." />
      </Helmet>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <i className="fa-solid fa-spinner fa-spin fa-4x text-main"></i>
        </div>
      ) : Cart ? (
        <div className="min-vh-100 py-4 px-3 ">
          <div className="container-lg">
            <h2 className="fw-bold mb-4">
              My <span className="text-main">Cart</span> <span className="fw-normal text-secondary fs-6">({Cart.numOfCartItems} items)</span>
            </h2>

            <div className="row g-4 align-items-start">
              {/* Cart Items */}
              <div className="col-lg-8">
                {Cart.data.products.map((product) => (
                  <div className="card border-0 shadow-sm rounded-3 mb-3" key={product.product._id}>
                    <div className="card-body d-flex align-items-center gap-3 p-3">

                      {/* Image */}
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        style={{ width: '72px', height: '72px', objectFit: 'contain' }}
                        className="rounded-2 flex-shrink-0"
                      />

                      {/* Info */}
                      <div className="flex-grow-1">
                        <p className="fw-semibold mb-1 small">
                          {product.product.title.split(' ').slice(0, 8).join(' ')}
                        </p>
                        <p className="text-main fw-bold mb-2 small">{product.price} EGP</p>

                        {/* Qty Controls */}
                        <div className="d-flex align-items-center  overflow-hidden" style={{ width: 'fit-content' }}>
                          <button
                            onClick={() => UpdateCount(product.product._id, product.count + 1)}
                            className="btn  btn-sm btn-outline-success"
                          >+</button>
                          <span className="fw-semibold px-3 large">{product.count}</span>
                          <button
                            onClick={() => UpdateCount(product.product._id, product.count - 1)}
                            className="btn btn-sm btn-outline-success"
                          >−</button>
                        </div>
                      </div>

                      {/* Right: total + remove */}
                      <div className="d-flex align-items-end gap-2 flex-shrink-0">
                        <span className="fw-bold text-main">{product.price * product.count} EGP</span>
                        <button
                          onClick={() => removeCartProduct(product.product._id)}
                          className="bg-transparent border-0"
                        >
                          <i className="fa-solid fa-trash-can text-danger fa-lg bg-transparent"></i>
                        </button>
                      </div>

                    </div>
                  </div>
                ))}

                {/* Clear All */}
                <button
                  onClick={ClearAllCart}
                  className="btn btn-outline-success w-100 "
                >
                  <i className="fa-solid fa-trash-can me-2"></i> Remove All Items
                </button>
              </div>
              {/* Order Summary */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm rounded-3 border-top border-success border-3">
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-3">Order Summary</h5>

                    <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3 text-secondary small">
                      <span>Items ({Cart.numOfCartItems})</span>
                      <span>{Cart.data.totalCartPrice} EGP</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <span className="fw-bold">Total</span>
                      <span className="fw-bold text-main fs-5">{Cart.data.totalCartPrice} EGP</span>
                    </div>
                    <Link to={'/checkOut'}>
                      <button
                        className="btn btn-success w-100 text-white fw-semibold mb-2"
                      >
                        <i className="fa-solid fa-credit-card me-2"></i>Checkout
                      </button>
                    </Link>
                    <Link to="/products" >
                      <button className="btn btn-outline-success w-100 ">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="rounded-circle d-flex align-items-center justify-content-center mb-4 bg-success bg-opacity-10"
            style={{ width: '100px', height: '100px' }}
          >
            <i className="fa-solid fa-cart-shopping text-main fa-2x"></i>
          </div>
          <h3 className="fw-bold text-main">Cart Is Empty</h3>
          <p className="text-secondary small">Looks like you haven't added anything yet.</p>
        </div>
      )}
    </>
  )
}