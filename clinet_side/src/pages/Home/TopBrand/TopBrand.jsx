import React from "react";
import b1 from "../../../assets/images/banner-1.png";
import b2 from "../../../assets/images/banner-2.png";
import TopBrandSlider from "./TopBrandSlider";

function TopBrand() {
  return (
    <section className="top-brand">
      <div className="container">
        <div className="row align-items-center">
            <TopBrandSlider />
        </div>
      </div>
    </section>
  );
}

export default TopBrand;
