import React from "react";

function Address() {
  return (
    <div className="card-address">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="payment-sec">
            <div className="top-heading">
              <span>PAYMENT OPTION</span>
              <a href="#">
                Add Card <i className="fa fa-angle-right ms-2" />
              </a>
            </div>
            <div className="info-inner">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 col-6">
                  <img src="/images/p-img-1.png" />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-6">
                  <img src="/images/p-img-2.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="billing-info">
            <div className="top-heading">
              <span>BILLING ADDRESS</span>
            </div>
            <div className="info-inner">
              <span className="mb-2 d-block">Kevin Gilbert</span>
              <p className="mb-2">
                East Tejturi Bazar, Word No. 04, Road No. 13/x, House no.
                1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh
              </p>
              <div className="d-flex align-items-center mt-3">
                <span>Email:</span>
                <p className="ms-2">kevin12345@gmail.com</p>
              </div>
              <div className="d-flex align-items-center mt-3">
                <span>Phone:</span>
                <p className="ms-2"> +1-202-555-0118</p>
              </div>
              <a
                href="#"
                id="edit-account-btn"
                className="btn btn-theme-outline mt-3"
              >
                EDIT ADDRESS
              </a>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="billing-info">
            <div className="top-heading">
              <span>SHIPPING ADDRESS</span>
            </div>
            <div className="info-inner">
              <span className="mb-2 d-block">Kevin Gilbert</span>
              <p className="mb-2">
                East Tejturi Bazar, Word No. 04, Road No. 13/x, House no.
                1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh
              </p>
              <div className="d-flex align-items-center mt-3">
                <span>Email:</span>
                <p className="ms-2">kevin12345@gmail.com</p>
              </div>
              <div className="d-flex align-items-center mt-3">
                <span>Phone:</span>
                <p className="ms-2"> +1-202-555-0118</p>
              </div>
              <a
                href="#"
                id="edit-address-btn"
                className="btn btn-theme-outline mt-3"
              >
                EDIT ADDRESS
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
