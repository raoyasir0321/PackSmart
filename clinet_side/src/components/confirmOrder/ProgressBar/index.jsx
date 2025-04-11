import React from "react";

const ProgressBar = () => (
  <div className="bg-white shadow-sm rounded-lg p-4 mb-8">
    <div className="flex justify-around items-center">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
          1
        </div>
        <span className="mt-2 text-sm font-semibold text-gray-700">Checkout</span>
      </div>
      <div className="w-16 border-t-2 border-gray-300"></div>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
          2
        </div>
        <span className="mt-2 text-sm font-semibold text-gray-700">Ready</span>
      </div>
      <div className="w-16 border-t-2 border-gray-300"></div>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
          3
        </div>
        <span className="mt-2 text-sm font-semibold text-gray-700">Confirmation</span>
      </div>
    </div>
  </div>
);

export default ProgressBar;
