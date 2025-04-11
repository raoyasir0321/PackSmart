import React from "react";

function SubscribeSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white py-12 min-h-[300px] flex items-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('/images/online-shopping.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 container mx-auto text-center px-6">
        <h3 className="text-4xl font-bold text-white">
          Stay Updated with Our Latest News & Offers
        </h3>
        <p className="text-lg mt-3 max-w-2xl mx-auto text-gray-200 leading-relaxed">
          Subscribe to our newsletter and be the first to know about new
          arrivals, exclusive deals, and exciting updates.
        </p>

        <form className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 w-80 text-gray-900 rounded-md focus:outline-none border border-gray-300 shadow-sm transition-all"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md transition-all transform hover:scale-105"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default SubscribeSection;
