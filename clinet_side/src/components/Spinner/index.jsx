import React from "react";
import PropTypes from "prop-types";

const Spinner = ({ size = "md", color = "black" }) => {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-4 ${sizes[size]} border-solid`}
        style={{ borderColor: color }}
      ></div>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.string,
};

export default Spinner;
