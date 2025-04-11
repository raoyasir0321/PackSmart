import React from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../../../api/hooks/useOrder";
import currencies from "@/utils/currencies";

const RecentOrders = () => {
  const { myOrders } = useOrder();
  const { data: ordersData, isLoading, isError } = myOrders;

  const orders =
    ordersData &&
    ordersData
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 7);

  const getStatusClass = (status) => {
    if (status === "INITIATED") return "orange";
    if (status === "PLACED") return "green";
    if (status === "DELIVERED") return "blue";
    return "text-gray-600";
  };

  return (
    <div className="recent-order">
      <div className="top-heading d-flex justify-content-between align-items-center">
        <span>RECENT ORDER</span>
        <Link to="/orders">
          View All <i className="fa fa-angle-right ms-2" />
        </Link>
      </div>

      <div className="order-titles d-lg-flex d-none">
        <div className="orderid">
          <span>Order ID</span>
        </div>
        <div className="status">
          <span>Status</span>
        </div>
        <div className="date">
          <span>Date</span>
        </div>
        <div className="total">
          <span>Total</span>
        </div>
        <div className="action">
          <span>Action</span>
        </div>
      </div>

      {isLoading ? (
        <p>Loading orders...</p>
      ) : isError ? (
        <p>Error loading orders.</p>
      ) : orders.length === 0 ? (
        <p>No recent orders found.</p>
      ) : (
        orders.map((order) => {
          const orderDate = new Date(order.createdAt).toLocaleString();
          return (
            <div className="order-info" key={order._id}>
              <div className="orderid">
                <span className="d-lg-none">Order ID: </span>
                <span>#{order._id.slice(0, 7)}</span>
              </div>
              <div className="status">
                <span className="d-lg-none">Status:</span>
                <span className={getStatusClass(order.status)}>
                  {order.status}
                </span>
              </div>
              <div className="date">
                <span className="d-lg-none">Date:</span>
                <span>{orderDate}</span>
              </div>
              <div className="total">
                <span className="d-lg-none">Total:</span>
                <span>
                  {currencies["GBP"].symbol}
                  {order.totalPrice} ({order.totalQuantity} Products)
                </span>
              </div>
              <div className="action">
                <span className="d-lg-none">Action:</span>
                <span>
                  <Link
                    to="/order-confirm"
                    state={{
                      order: order,
                      orderItems: order.orderitems,
                      backtoHome: false,
                      from: "/my-account",
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    View Details <i className="fa fa-angle-right ms-2" />
                  </Link>
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default RecentOrders;
