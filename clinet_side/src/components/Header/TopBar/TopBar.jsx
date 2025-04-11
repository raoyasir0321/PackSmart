import React from "react";
import phoneIcon from "../../../assets/images/phone-icon.png";

function TopBar() {
  return (
    <section className="top-bar">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="welcome">
              <img src={phoneIcon} alt="" />
              <p>
                We are available 24/7
                {/* <span>+099949343</span> */}
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="social">
              <div className="left d-xl-block d-none">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopBar;
