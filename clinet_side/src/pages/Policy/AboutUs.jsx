import React, { useEffect } from "react";
import Policy from ".";

function AboutUs() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
  return (
    <div>
      <Policy head={"Aboutus"} />
    </div>
  );
}

export default AboutUs;
