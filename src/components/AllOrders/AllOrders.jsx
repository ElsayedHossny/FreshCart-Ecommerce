import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function AllOrders() {

  let UserEmail = localStorage.getItem("useremail");

  async function getAllOrders() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
      .then((response) => response)
      .catch((err) => err);
  }

  let { data, isLoading } = useQuery({
    queryKey: ['AllOrders'],
    queryFn: getAllOrders,
  });

  const userProducts = [];
  data?.data?.data?.forEach((order) => {
    if (order.user.email === UserEmail) {
      userProducts.push(order);
    }
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <i className="fa-solid fa-spinner fa-spin fa-4x text-main"></i>
      </div>
    );
  }

  if (userProducts.length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="rounded-circle d-flex align-items-center justify-content-center mb-4 bg-success bg-opacity-10"
          style={{ width: '100px', height: '100px' }}>
          <i className="fa-solid fa-box-open fa-2x text-main"></i>
        </div>
        <h3 className="fw-bold text-main">No Orders Yet</h3>
        <p className="text-secondary small">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="min-vh-100 mt-3 py-4 bg-light">
      <div className="container">

        <h2 className="fw-bold mb-4">
          My <span className="text-main">Orders</span>{' '}
          <span className="fw-normal text-secondary fs-6">({userProducts.length} orders)</span>
        </h2>

        {userProducts.map((order) => (
          <div key={order._id} className="card border-0 shadow-sm rounded-3 mb-4 overflow-hidden"
            style={{ borderLeft: '3px solid var(--main-color, #0aad0a)' }}>
            <div className="card-body p-4">

              {/* Order Header */}
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3 pb-3 border-bottom">
                <div>
                  <p className="text-secondary mb-1" style={{ fontSize: '12px' }}>Order ID</p>
                  <p className="fw-semibold mb-0">#{order.id}</p>
                </div>
                <div>
                  <p className="text-secondary mb-1" style={{ fontSize: '12px' }}>Date</p>
                  <p className="fw-semibold mb-0">{new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
                </div>
                <div>
                  <p className="text-secondary mb-1" style={{ fontSize: '12px' }}>Payment</p>
                  <p className="fw-semibold mb-0 text-capitalize">{order.paymentMethodType}</p>
                </div>
                <div>
                  <p className="text-secondary mb-1" style={{ fontSize: '12px' }}>Total</p>
                  <p className="fw-semibold mb-0 text-main">{order.totalOrderPrice} EGP</p>
                </div>
                <div>
                  {order.isDelivered ? (
                    <span className="badge rounded-pill px-3 py-2"
                      style={{ backgroundColor: '#edfaed', color: '#0a7a0a', fontSize: '12px' }}>
                      Delivered
                    </span>
                  ) : order.isPaid ? (
                    <span className="badge rounded-pill px-3 py-2 bg-primary"
                      style={{ fontSize: '12px' }}>
                      Paid
                    </span>
                  ) : (
                    <span className="badge rounded-pill px-3 py-2"
                      style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '12px' }}>
                      Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="row g-3">
                {order.cartItems.map((item) => (
                  <div className="col-6 col-md-3 col-lg-2" key={item._id}>
                    <div className="rounded-3 p-2 text-center h-100 bg-light">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="rounded-2 mb-2"
                        style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                      />
                      <p className="mb-1 fw-semibold" style={{ fontSize: '12px', lineHeight: '1.3' }}>
                        {item.product.title.split(' ').slice(0, 4).join(' ')}
                      </p>
                      <p className="mb-0 text-main fw-bold" style={{ fontSize: '12px' }}>{item.price} EGP</p>
                      <p className="mb-0 text-secondary" style={{ fontSize: '11px' }}>Qty: {item.count}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

