import React from "react";

function Voucher() {
  return (
    <div className="order-history voucher-details">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="recent-order">
            <div className="top-heading">
              <span>VOUCHER DETAILS</span>
            </div>
            <div className="voucher-tabs">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="availableVoucher-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#availableVoucher"
                    type="button"
                    role="tab"
                    aria-controls="availableVoucher"
                    aria-selected="false"
                  >
                    Available Voucher
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="useVoucher-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#useVoucher"
                    type="button"
                    role="tab"
                    aria-controls="useVoucher"
                    aria-selected="true"
                  >
                    Used Voucher
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade"
                  id="availableVoucher"
                  role="tabpanel"
                  aria-labelledby="availableVoucher-tab"
                >
                  <div className="order-titles d-lg-flex d-none">
                    <div className="orderid">
                      <span className="text-capitalize">Voucher Title</span>
                    </div>
                    <div className="status">
                      <span className="text-capitalize">Status</span>
                    </div>
                    <div className="date">
                      <span className="text-capitalize">Minimum Amout</span>
                    </div>
                    <div className="date">
                      <span className="text-capitalize">Maximum Amout</span>
                    </div>
                    <div className="date">
                      <span className="text-capitalize">Discount</span>
                    </div>
                  </div>
                  <div className="order-info">
                    <div className="orderid">
                      <span className="d-lg-none">Voucher Title: </span>
                      <span>Title</span>
                    </div>
                    <div className="status">
                      <span className="d-lg-none">Status:</span>
                      <span className="green">Available</span>
                    </div>
                    <div className="date">
                      <span className="d-lg-none">Minumum Amount:</span>
                      <span>$3.00</span>
                    </div>
                    <div className="date">
                      <span className="d-lg-none">Maximum Amount:</span>
                      <span>$5.00</span>
                    </div>
                    <div className="date">
                      <span className="d-lg-none">Discount:</span>
                      <span>$2.00</span>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade active show"
                  id="useVoucher"
                  role="tabpanel"
                  aria-labelledby="useVoucher-tab"
                >
                  <div className="order-titles d-lg-flex d-none">
                    <div className="orderid">
                      <span className="text-capitalize">Voucher Title</span>
                    </div>
                    <div className="status">
                      <span className="text-capitalize">Status</span>
                    </div>
                    <div className="date">
                      <span className="text-capitalize">Minimum Amout</span>
                    </div>
                    <div className="date">
                      <span className="text-capitalize">Maximum Amout</span>
                    </div>
                    <div className="date">
                      <span className="text-capitalize">Discount</span>
                    </div>
                  </div>
                  <div className="order-info">
                    <div className="orderid">
                      <span className="d-lg-none">Voucher Title: </span>
                      <span>Title</span>
                    </div>
                    <div className="status">
                      <span className="d-lg-none">Status:</span>
                      <span className="red">Used</span>
                    </div>
                    <div className="date">
                      <span className="d-lg-none">Minumum Amount:</span>
                      <span>$3.00</span>
                    </div>
                    <div className="date">
                      <span className="d-lg-none">Maximum Amount:</span>
                      <span>$5.00</span>
                    </div>
                    <div className="date">
                      <span className="d-lg-none">Discount:</span>
                      <span>$2.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-pagination">
            <img src="/images/a-left.png" alt="" />
            <a className="active" href="#">
              01
            </a>
            <a href="#">02</a>
            <a href="#">03</a>
            <img src="/images/a-right.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voucher;
