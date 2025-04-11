import React from "react";
import TopSection from "./TopSection/TopSection";
import SupportSections from "./SupportSections";
import FeatureSection from "./FeaturedSections.jsx/FeatureSection";
import TechnologySection from "./TechnologySection/TechnologySection";
import ExploreSection from "./ExploreSection/ExploreSection";
import NewArrivals from "./NewArrivals.jsx/NewArrivals";
import TopBrand from "./TopBrand/TopBrand";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import SubscribeSection from "./SubscribeSection.jsx/SubscribeSection";

function index() {
  return (
    <>
      <TopSection />
      <SupportSections />
      <FeatureSection />
      <TechnologySection />
      <ExploreSection />
      <NewArrivals title={"NEW ARRIVALS"} />
      {/* <TopBrand /> */}
      {/* <NewArrivals title={"BEST SELLING"} /> */}
      {/* <FeaturedProducts /> */}
      <SubscribeSection />
    </>
  );
}

export default index;
