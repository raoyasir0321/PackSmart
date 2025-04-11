import React from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../../../api/hooks/useOrder";
import currencies from "@/utils/currencies";

function OrderHistory() {
  const { myOrders } = useOrder();
  const { data: orders, isPending: isLoadingOrders } = myOrders;

  if (isLoadingOrders) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-lg text-gray-800">Loading orders...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-lg text-gray-800">No orders found.</p>
      </div>
    );
  }

 
  const sortedOrders = orders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
 
  const totalSpent = sortedOrders.reduce((sum, order) => sum + order.totalPrice, 0);


  const currenyCode = currencies["GBP"].symbol
  return (
    <div className="recent-order">
      <div className="top-heading mb-4 flex flex-col md:flex-row md:justify-between items-center">
        <span className="text-xl font-bold text-gray-900">ORDER HISTORY</span>
        <div className="flex space-x-4">
          <span className="text-xl font-bold text-gray-900">Orders: {sortedOrders.length}</span>
          <span className="text-xl font-bold text-gray-900">Total Spent: {currenyCode}{totalSpent.toFixed(2)}</span>
        </div>
      </div>
      

      <div className="order-titles d-lg-flex d-none mb-2 border-b border-gray-300 pb-2">
        <div className="orderid flex-1">
          <span className="font-semibold text-gray-700">Order ID</span>
        </div>
        <div className="status flex-1">
          <span className="font-semibold text-gray-700">Status</span>
        </div>
        <div className="date flex-1">
          <span className="font-semibold text-gray-700">Date</span>
        </div>
        <div className="total flex-1">
          <span className="font-semibold text-gray-700">Total</span>
        </div>
        <div className="action flex-1">
          <span className="font-semibold text-gray-700">Action</span>
        </div>
      </div>

      
      {sortedOrders.map((order) => (
        <div key={order._id} className="order-info flex flex-col md:flex-row items-start md:items-center border-b border-gray-200 py-4">
         
          <div className="orderid flex-1">
            <span className="d-lg-none font-semibold text-gray-700">Order ID: </span>
            <span className="text-gray-900">#{order._id.slice(0, 9)}..</span>
          </div>
         
          <div className="status flex-1">
            <span className="d-lg-none font-semibold text-gray-700">Status: </span>
            <span
              className={
                order.status.toLowerCase() === "completed"
                  ? "text-green-600"
                  : order.status.toLowerCase() === "canceled"
                  ? "text-red-600"
                  : "text-orange-600"
              }
            >
              {order.status}
            </span>
          </div>
         
          <div className="date flex-1">
            <span className="d-lg-none font-semibold text-gray-700">Date: </span>
            <span className="text-gray-900">{new Date(order.createdAt).toLocaleString()}</span>
          </div>
         
          <div className="total flex-1">
            <span className="d-lg-none font-semibold text-gray-700">Total: </span>
            <span className="text-gray-900">{currenyCode} {order.totalPrice} ({order.totalQuantity} Products)</span>
          </div>
         
          <div className="action flex-1">
            <span className="d-lg-none font-semibold text-gray-700">Action: </span>
            <span>
              <Link
                to="/order-confirm"
                state={{
                  order: order,
                  orderItems: order.orderitems,
                  backtoHome: false,
                  from: "/my-account"
                }}
                className="text-blue-600 hover:underline"
              >
                View Details <i className="fa fa-angle-right ms-2" />
              </Link>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
