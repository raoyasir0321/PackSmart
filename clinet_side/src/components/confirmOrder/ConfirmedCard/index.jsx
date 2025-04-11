import React from "react";

const ConfirmedCard = ({ order }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Order is Confirmed</h2>
    <p className="text-gray-800 mb-2">
      Order Number: <span className="font-semibold">{order._id}</span>
    </p>
    <p className="text-gray-800 mb-2">
      Status: <span className="font-semibold">{order.status}</span>
    </p>
    <p className="text-gray-800">
      Hey We’re getting your order ready.</p>
  </div>
);

export default ConfirmedCard;
