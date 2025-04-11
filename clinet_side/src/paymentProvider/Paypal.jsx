import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Paypal({ orderId, onPayPalSuccess }) {
  const initialOptions = {
    "client-id": "AYOnnSTl7Z5nNwQ55JERDUYQSoxmToKUoWX2p4a6nVd7m513WEMqdEf0paz12bE3NT2TiQ-vBonFCRtR",
    currency: "GBP",
    components: "buttons",
  };

  const [message, setMessage] = useState("");

  return (
    <div>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{ shape: "rect", layout: "vertical", color: "gold", label: "paypal" }}
          createOrder={async () => {
            try {
              
              const response = await fetch("http://localhost:8000/api/paypal/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
              });
              const orderData = await response.json();

              if (orderData.id) {
                return orderData.id;
              } else {
                throw new Error("No PayPal order ID returned from server.");
              }
            } catch (error) {
              console.error("createOrder error:", error);
              setMessage(`Could not initiate PayPal Checkout... ${error.message}`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              
              const response = await fetch("http://localhost:8000/api/paypal/capture-paypal-order/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  paypalOrderId: data.orderID,
                  eComOrderId: orderId,
                }),
              });
              const captureData = await response.json();

              if (captureData.purchase_units) {
                
                setMessage("Transaction successful!");
                console.log("Capture result:", captureData);

                
                if (typeof onPayPalSuccess === "function") {
                  onPayPalSuccess(captureData);
                }
              } else {
                throw new Error("Capture failed: " + JSON.stringify(captureData));
              }
            } catch (error) {
              console.error("onApprove error:", error);
              setMessage(`Sorry, your transaction could not be processed... ${error.message}`);
            }
          }}
        />
      </PayPalScriptProvider>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Paypal;
