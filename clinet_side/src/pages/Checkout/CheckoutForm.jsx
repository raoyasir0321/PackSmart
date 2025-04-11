import React, { useState } from "react";
import CustomSelectOption from "../../components/SelectOption/CustomSelectOption";
import { useNavigate } from "react-router-dom";

function CheckoutForm({ activeSection }) {
  const [country, setCountry] = useState("Select Country");
  const [region, setRegion] = useState("Select Region/State");
  const [city, setCity] = useState("Select City");
  const navigate = useNavigate();

  const countries = ["Pakistan", "Canada", "Germany", "France"];
  const regions = ["Sindh", "Ontario", "Bavaria", "Île-de-France"];
  const cities = ["Karachi", "Toronto", "Munich", "Paris"];
  return (
    <div className="col-xl-8 col-lg-8 col-md-7">
      <div className="checkout-form">
        <h1>Billing Information</h1>
        <form
          method="POST"
          action=""
          className="needs-validation"
          noValidate=""
        >
          <div className="row">
            {activeSection === "Address" ? (
              <>
                <div className="col-xl-4 col-md-6">
                  <div className="mb-4">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      pattern="[A-Za-z ]+"
                      placeholder="Enter First Name"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="mb-4">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      pattern="[A-Za-z ]+"
                      placeholder="Enter Last Name"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-md-12">
                  <div className="mb-4">
                    <label>Company Name (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      pattern="[A-Za-z ]+"
                      placeholder="Enter Company Name"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-4">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter Address"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="mb-4 d-flex flex-column">
                    <label>Coutry</label>
                    <CustomSelectOption
                      options={countries}
                      selectedOption={country}
                      setSelectedOption={setCity}
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="mb-4 d-flex flex-column">
                    <label>Region/State</label>
                    <CustomSelectOption
                      options={regions}
                      selectedOption={region}
                      setSelectedOption={setCity}
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="mb-4 d-flex flex-column">
                    <label>City</label>
                    <CustomSelectOption
                      options={cities}
                      selectedOption={city}
                      setSelectedOption={setCity}
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="mb-4">
                    <label>Zip Code</label>
                    <input
                      type="number"
                      className="form-control"
                      name="name"
                      placeholder="Enter Zip Code"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      pattern="[^\s@]+@[a-zA-Z]+[^0-9@]+\.[cC][oO][mM]$"
                      placeholder="Enter Email*"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <label>Contact No.</label>
                    <input
                      type="number"
                      className="form-control"
                      name="phone"
                      onkeypress="if(this.value.length==12) return false;"
                      placeholder="Enter Contact No.*"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-md-12">
                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="All Price"
                        required=""
                      />
                      <label
                        className="form-check-label mb-0 ms-2"
                        htmlFor="All Price"
                      >
                        Ship into different address
                      </label>
                    </div>
                  </div>
                </div>
              </>
            ) : activeSection === "Payment" ? (
              <div className="col-md-12">
                <div className="payment-option">
                  <div className="payment-heading">
                    <h2>Payment Option</h2>
                  </div>
                  <div className="radio-btn">
                    <div className="d-flex flex-column align-items-center">
                      <img src="/images/cash-icon.png" />
                      <span>Cash on Delivery</span>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="cash"
                          id="Cash on Delivery"
                          defaultChecked=""
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <img src="/images/paypal-icon.png" />
                      <span>Paypal</span>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="cash"
                          id="Paypal"
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <img src="/images/amazon-icon.png" />
                      <span>Amazon Pay</span>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="cash"
                          id="Amazon Pay"
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <img src="/images/debit-icon.png" />
                      <span>Debid/Credit Card</span>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="cash"
                          id="Debid/Credit Card"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-4">
                        <label>Name on Card</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          pattern="[A-Za-z ]+"
                          placeholder="Enter Name on Card"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-4">
                        <label>Card Number</label>
                        <input
                          type="number"
                          className="form-control"
                          name="name"
                          placeholder="Enter Card Number"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label>Expire Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name="name"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label>CVC</label>
                        <input
                          type="number"
                          className="form-control"
                          name="name"
                          onkeypress="if(this.value.length==3) return false;"
                          placeholder="Enter Card Number"
                          required=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div class="col-md-12">
              <div class="mb-0">
                <button
                  disabled={activeSection === "Address"}
                  type="button"
                  onClick={() => {
                    navigate("/order-confirm");
                  }}
                  class="btn btn-theme-yellow w-100 mt-3"
                >
                  PLACE ORDER <i class="fa fa-angle-right ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
