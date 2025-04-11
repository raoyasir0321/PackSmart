import React from "react";
import slide1 from "../../../assets/images/slide-1.png";
import TopSectionSlider from "./TopSectionSlider";

function TopSection() {
  return (
    <section className="top-section">
      <div className="container">
        <div className="row">
          <TopSectionSlider />
        </div>
      </div>
    </section>
  );
}

export default TopSection;
