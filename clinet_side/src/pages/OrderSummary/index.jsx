import React from "react";

const OrderSummary = ({ order, orderItems }) => {
  return (
    <div className="border-t border-gray-300 pt-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Summary</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-800 font-medium">Order ID:</p>
            <p className="text-gray-900">{order._id}</p>
          </div>
          <div>
            <p className="text-gray-800 font-medium">Status:</p>
            <p className="text-gray-900">{order.status}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-800 font-medium">Total Quantity:</p>
            <p className="text-gray-900">{order.totalQuantity}</p>
          </div>
          <div>
            <p className="text-gray-800 font-medium">Total Price:</p>
            <p className="text-gray-900">${order.totalPrice}</p>
          </div>
        </div>
        <div>
          <p className="text-gray-800 font-medium">Order Date:</p>
          <p className="text-gray-900">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Order Items</h3>
          {orderItems && orderItems.length > 0 ? (
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div
                  key={item._id}
                  className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-800 font-medium">Product ID:</p>
                      <p className="text-gray-900">{item.productId}</p>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Size:</p>
                      <p className="text-gray-900">{item.size}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <p className="text-gray-800 font-medium">Quantity:</p>
                      <p className="text-gray-900">{item.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Price:</p>
                      <p className="text-gray-900">${item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-900">No items found in this order.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
