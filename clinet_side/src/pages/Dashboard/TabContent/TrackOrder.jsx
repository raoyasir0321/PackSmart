import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../../../../src/api/hooks/useOrder";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { Progress } from "@/components/components/ui/progress";
import OrderProcessing from "./OrderProcessing";
import { steps } from "@/components/lib/utils";

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { singleOrder } = useOrder();
  const queryClient = useQueryClient();

  const handleTrackOrder = async (e) => {
    if (!orderId) return;
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const orderData = await singleOrder(orderId);
      if (orderData && orderData.length) {
        setOrder(orderData[0]);
      } else {
        setError("Order not found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch order. Please try again.");
    }
    setIsLoading(false);
  };
  const orderStatusHistory = order?.statusHistory || [];

  const getStatusSet = () => {
    if (!order) return new Set();
    return new Set(order.statusHistory.map((s) => s.status));
  };

  return (
    <div className="col-xl-12 col-lg-12 col-md-12">
      {/*  Form */}
      <div className="order-search">
        <span>Track Order</span>
        <p>
          To track your order please enter your Order ID in the input field
          below and press the “Track Order” button. This information was
          provided on your receipt and in the confirmation email.
        </p>
        <form onSubmit={handleTrackOrder} className="needs-validation">
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <div className="mb-4">
                <label>Order ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Order ID"
                  required
                />
              </div>
            </div>
            {/* <div className="col-xl-6 col-md-6">
              <div className="mb-4">
                <label>Billing Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={billingEmail}
                  onChange={(e) => setBillingEmail(e.target.value)}
                  placeholder="Billing Email"
                  required
                />
              </div>
            </div> */}
            <div className="col-xl-12 col-md-12">
              <div className="mb-4">
                <p className="mb-0">
                  <i className="fa fa-info-circle me-1" /> Order ID that we sent
                  to your email.
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="mb-0">
                <button type="submit" className="btn btn-theme-yellow w-100">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      TRACK ORDER <i className="fa fa-angle-right ms-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {error && <p className="text-danger mt-2">{error}</p>}

      {order && (
        <div className="search-detail">
          {/* Order Processing  */}
          <div className="order-processing-detail">
            <div className="order-number">
              <div className="mb-0">
                <span>#{order._id.slice(0, 7)}</span>
                <div className="mb-0 d-xl-flex gap-2">
                  <span className="product-count">
                    {order.totalQuantity} Products
                  </span>
                  <span className="dot d-xl-block d-none">.</span>
                  <span className="date">
                    Order Placed on {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <span className="total-count">
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>

            {/*  processing steps */}

            <OrderProcessing
              steps={steps}
              orderStatusHistory={orderStatusHistory}
            />
          </div>

          <div className="order-activity mt-4">
            <span>Order Activity</span>
            {order.statusHistory.map((history) => (
              <div key={history._id} className="activity-sec">
                <img
                  src={`/images/a-icon-${
                    history.status === "COMPLETED"
                      ? 1
                      : history.status === "PLACED"
                      ? 2
                      : 3
                  }.png`}
                  alt={history.status}
                />
                <div className="mb-0">
                  <span>
                    {history.status === "COMPLETED"
                      ? "Your order has been delivered. Thank you for shopping at PackSmart!"
                      : history.status === "PLACED"
                      ? "Order is Confirmed"
                      : history.status === "DELIVERED"
                      ? "Your order is on the way."
                      : "Your order is in process."}
                  </span>
                  <p className="mb-0">
                    {new Date(history.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Product Details */}
          <div className="order-product mt-4">
            <div className="order-heading">
              <span>Product ({order.orderItems.length})</span>
            </div>
            <div className="product-title d-xl-flex d-none">
              <div className="products">
                <span>Products</span>
              </div>
              <div className="price">
                <span>Price</span>
              </div>
              <div className="quantity">
                <span>Quantity</span>
              </div>
              <div className="sub-total">
                <span>Sub-Total</span>
              </div>
            </div>
            {order.orderItems.map((item) => {
              const product = item.product[0];
              return (
                <div key={item._id} className="order-information">
                  <div className="product-info">
                    <img src={product?.imageUrl} alt={product?.name} />
                    <div className="mb-0">
                      <Link to={`/product/${product?._id}`}>
                        {product?.name}
                      </Link>
                      <p className="mb-0">{product?.description}</p>
                    </div>
                  </div>
                  <div className="price-info">
                    <span className="d-lg-none">Price: </span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                  <div className="product-quantity">
                    <span className="d-lg-none">Quantity: </span>
                    <span>*{item.quantity}</span>
                  </div>
                  <div className="product-sub-total">
                    <span className="d-lg-none">Sub Total: </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackOrder;
