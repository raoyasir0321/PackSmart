import React from "react";
import { useCart } from "../../Context/CartContext";
import currencies from "@/utils/currencies";

function CheckoutSummary({ setActiveSection, activeSection }) {
  const { cart } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);


  const shipping = 0; 
  const discount = 0; 
  const tax = 0; 
  const total = subtotal + tax - discount + shipping;

  return (
    <div className="col-xl-4 col-lg-4 col-md-5 sticky-md-top">
      <div className="order-breadcrumbs">
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveSection("Address");
          }}
          className={activeSection === "Address" ? "active" : ""}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span style={{ fontWeight: "500" }}>Address</span>
        </button>
        <span> - </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveSection("Payment");
          }}
          className={activeSection === "Payment" ? "active" : ""}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span style={{ fontWeight: "500" }}>Payment</span>
        </button>
      </div>
      <div className="order-summary">
        <div className="heading">
          <h3>Order Summary</h3>
        </div>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div className="cart-product" key={index}>
              <img src={item.image} alt={item.name} />
              <div className="mb-0">
                <p>{item.name}</p>
                <span>
                  {item.quantity} * {currencies[item.currency]?.symbol}
                  {item.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No items in your cart</p>
        )}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <p>Sub-total</p>
          <span>
            {currencies["GBP"]?.symbol}
            {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <p>Shipping</p>
          <span>
            {shipping === 0
              ? "Free"
              : currencies["GBP"]?.symbol + shipping.toFixed(2)}
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <p>Discount</p>
          <span>
            {discount
              ? currencies["GBP"]?.symbol + discount.toFixed(2)
              : currencies["GBP"]?.symbol + "0.00"}
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <p>Tax</p>
          <span>
            {currencies["GBP"]?.symbol}
            {tax.toFixed(2)}
          </span>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
          <p>Total</p>
          <span>
            {currencies["GBP"]?.symbol}
            {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSummary;
