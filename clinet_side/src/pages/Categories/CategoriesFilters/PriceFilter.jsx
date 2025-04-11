import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceFilter = ({ initialPrices, handleFilter }) => {
  const [priceRange, setPriceRange] = useState([
    initialPrices[0],
    initialPrices[initialPrices.length - 1],
  ]);

  const handleSliderChange = (values) => {
    setPriceRange(values);
    handleFilter(values);
  };

  return (
    <div className="p-5 rounded-lg shadow-md bg-white">
      <span className="text-lg font-semibold text-gray-800 block mb-4">
        Price Range
      </span>
      <div className="relative px-3">
        <Slider
          range
          min={initialPrices[0]}
          max={initialPrices[initialPrices.length - 1]}
          step={1}
          defaultValue={priceRange}
          onChange={handleSliderChange}
          trackStyle={[
            {
              background: "linear-gradient(90deg, #0287ca, #02caca)",
              height: 8,
              borderRadius: 4,
            },
          ]}
          handleStyle={[
            {
              backgroundColor: "#fff",
              border: "3px solid #0287ca",
              width: 24,
              height: 24,
              boxShadow: "0 0 4px rgba(0,0,0,0.2)",
              marginTop: -8,
            },
            {
              backgroundColor: "#fff",
              border: "3px solid #0287ca",
              width: 24,
              height: 24,
              boxShadow: "0 0 4px rgba(0,0,0,0.2)",
              marginTop: -8,
            },
          ]}
          railStyle={{
            backgroundColor: "#E5E7EB",
            height: 8,
            borderRadius: 4,
          }}
        />
      </div>
      <div className="mt-5 text-sm text-gray-700 text-center bg-gray-100 p-2 rounded-lg">
        Selected:{" "}
        <span className="font-semibold text-[#0287ca]">
          £{priceRange[0]} - £{priceRange[1]}
        </span>
      </div>
    </div>
  );
};

export default PriceFilter;
