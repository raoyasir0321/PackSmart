import React from "react";
import fp1 from "../../../assets/images/fp-1.png";
import fp2 from "../../../assets/images/fp-2.png";
import FeaturedProductsSlider from "./FeaturedProductsSlider";

function FeaturedProducts() {
  return (
    <section className="top-brand">
      <div className="container">
        <div className="border-line">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-8">
              <div className="left">
                <h2>Featured Products</h2>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-4">
              <div className="right">
                <a href="#">
                  View All <i className="fa fa-angle-right ms-2" />
                </a>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12">
              <hr />
            </div>
          </div>
          <div className="row align-items-center">
            {/* <div className="featured-slider"> */}
            <FeaturedProductsSlider/>
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
