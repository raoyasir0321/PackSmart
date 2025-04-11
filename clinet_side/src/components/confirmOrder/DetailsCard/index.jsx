import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const DetailsCard = ({ order, orderItems }) => {
  const [isOpen, setIsOpen] = useState(false);
console.log("orderItems",orderItems)
console.log("order",order)
  const displayedItems =
    orderItems && orderItems.length > 2
      ? isOpen
        ? orderItems
        : orderItems.slice(0, 2)
      : orderItems;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Details</h2>
      <div className="mb-4">
        <p className="text-gray-800">
          Subtotal: <span className="font-semibold">${order.totalPrice}</span>
        </p>
        <p className="text-gray-800">
          Total Quantity: <span className="font-semibold">{order.totalQuantity}</span>
        </p>
        {order.paymentMethod && (
          <p className="text-gray-800">
            Payment Method: <span className="font-semibold">{order.paymentMethod}</span>
          </p>
        )}
        <p className="text-gray-800">
          Final Total: <span className="font-semibold">${order.totalPrice}</span>
        </p>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Items</h3>
        {orderItems && orderItems.length > 0 ? (
          <div className="space-y-4">
            {displayedItems.map((item) => (
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
        {orderItems && orderItems.length > 2 && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center mt-4 text-[#0287ca] font-semibold transition-all duration-300"
          >
            <ChevronDown
              className={`w-6 h-6 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
            <span className="ml-2">{isOpen ? "Show Less" : "Show More"}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailsCard;
