import React, { useEffect, useState } from "react";
import comingsoon from "../../assets/images/comingsoon.jpg";

function ComingSoon() {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobileScreen(mediaQuery.matches);

    const handleResize = () => {
      setIsMobileScreen(mediaQuery.matches);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container justify-content-center mt-4">
      <div className="d-flex justify-content-center ">
        <img
          src={comingsoon}
          style={{
            width: isMobileScreen ? "140px" : "400px",
            height: isMobileScreen ? "140px" : "400px",
          }}
        />
      </div>
    </div>
  );
}

export default ComingSoon;
