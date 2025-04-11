import React from "react";
import { Truck, RefreshCcw, ShieldCheck, Headphones } from "lucide-react"; // Import appropriate icons

function SupportSections() {
  return (
    <section className="support-sec">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="support-inner">
              <div className="s-box">
                <Truck className="w-10 h-10 text-blue-600" />{" "}
                <div className=" ml-2 mb-0">
                  <p>Fastest Delivery</p>
                  <span>Delivery in 24/H</span>
                </div>
              </div>

              <div className="s-box">
                <RefreshCcw className="w-10 h-10 text-green-600" />{" "}
                <div className=" ml-2 mb-0">
                  <p>24 Hours Return</p>
                  <span>100% money-back guarantee</span>
                </div>
              </div>

              <div className="s-box">
                <ShieldCheck className="w-10 h-10 text-yellow-600" />{" "}
                <div className=" ml-2 mb-0">
                  <p>Secure Payment</p>
                  <span>Your money is safe</span>
                </div>
              </div>

              <div className="s-box">
                <Headphones className="w-10 h-10 text-red-600" />{" "}
                <div className=" ml-2 mb-0">
                  <p>Support 24/7</p>
                  <span>Live contact/message</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupportSections;
