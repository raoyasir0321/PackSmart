import React from "react";

const Banner = ({ orderId }) => (
  <div className="bg-[#0287ca] p-8 rounded-lg shadow-lg text-center mb-12">
    <div className="flex justify-center mb-4">
      <svg
        className="w-16 h-16 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2l4-4"
        />
      </svg>
    </div>
    <h1 className="text-4xl font-extrabold text-white">Thank You!</h1>
    <p className="mt-2 text-xl text-white">
      Your order <span className="font-semibold">#{orderId}</span> has been successfully placed.
    </p>
  </div>
);

export default Banner;
