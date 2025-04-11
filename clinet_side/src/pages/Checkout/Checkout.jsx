import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";

function Checkout() {
  const [activeSection, setActiveSection] = useState("Address");

  return (
    <section className="checkout">
      <div className="container">
        <div className="row align-items-md-start">
          <CheckoutForm activeSection={activeSection} />
          <CheckoutSummary
            setActiveSection={setActiveSection}
            activeSection={activeSection}
          />
        </div>
      </div>
    </section>
  );
}

export default Checkout;
