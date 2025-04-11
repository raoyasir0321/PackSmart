import Banner from "@/components/confirmOrder/Banner";
import ConfirmedCard from "@/components/confirmOrder/ConfirmedCard";
import DetailsCard from "@/components/confirmOrder/DetailsCard";
import ProgressBar from "@/components/confirmOrder/ProgressBar";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function OrderConfirm() {
  const location = useLocation();

  const { order, orderItems, backtoHome, from } = location.state || {};

  if (!order) {
    return (
      <section className="bg-gray-100 min-h-screen flex items-center justify-center py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Order Not Found</h1>
          <p className="mt-4 text-lg text-gray-800">
            We could not retrieve your order details. Please try again or contact support.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-[#0287ca] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link
          to={backtoHome ? "/" : (from || "/")}
          className="group inline-flex items-center justify-center cursor-pointer mb-8"
        >
          <ArrowLeft className="w-8 h-8 text-[#0287ca] transition-transform duration-300 transform group-hover:rotate-90" />
          <span className="ml-2 text-[#0287ca] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Back to Home
          </span>
        </Link>


        <ProgressBar />

        <Banner orderId={order._id} />


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          <div>
            <ConfirmedCard order={order} />

          </div>

          <div>
            <DetailsCard order={order} orderItems={orderItems} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderConfirm;
