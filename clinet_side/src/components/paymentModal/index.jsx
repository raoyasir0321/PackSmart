import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/components/ui/dialog";
import Paypal from "../../paymentProvider/Paypal";

const PaymentModal = ({
  show,
  onClose,
  paymentSuccess,
  paymentMethod,
  setPaymentMethod,
  orderData,
  onPayPalSuccess,
  onDebitCreditPayment,
}) => {
  const handleClose = () => {
    onClose();
    setPaymentMethod(null);
  };

  return (
    <Dialog open={show} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {paymentSuccess ? "Payment Successful" : "Choose Payment Method"}
          </DialogTitle>
          <DialogDescription>
            {paymentSuccess
              ? "Your payment was processed successfully!"
              : "Select one of the options below to proceed with payment."}
          </DialogDescription>
        </DialogHeader>


        {!paymentSuccess && !paymentMethod && (
          <div className="items-center flex flex-col my-4">
\
            <button
              onClick={() => setPaymentMethod("paypal")}
              className="btn btn-paypal mb-2"
            >
              Select Payment Provider
            </button>
            <button
              onClick={() => setPaymentMethod("paypal")}
              className="w-64 py-3 px-6 flex items-center justify-center rounded-lg border border-gray-300 bg-white shadow-md hover:bg-gray-100 transition-all"
            >
              <img src="/images/paypal-icon.png" alt="Paypal" className="w-6 h-6 mr-2" />
              <span>Paypal</span>
            </button>
          </div>
        )}

        
        {!paymentSuccess && paymentMethod === "paypal" && orderData && (
          <div className="my-4">
            <Paypal orderId={orderData._id} onPayPalSuccess={onPayPalSuccess} />
          </div>
        )}

        {!paymentSuccess && paymentMethod === "card" && (
          <div className="my-4">
            <p>Debit/Credit Card Payment Flow</p>
            <button onClick={onDebitCreditPayment} className="btn btn-theme">
              Proceed with Card Payment
            </button>
          </div>
        )}

        {paymentSuccess && (
          <div className="flex flex-col items-center justify-center my-6">
            <svg
              className="text-green-600 mb-2"
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="36" cy="36" r="36" fill="currentColor" opacity="0.1" />
              <path
                d="M27.8 38.4l5.7 5.7 10.8-10.8"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-xl font-semibold text-green-600">
              Payment Successful!
            </p>
            <p className="text-gray-600 text-sm mt-2">
              We’re processing your order. You’ll be redirected shortly.
            </p>
          </div>
        )}

        <DialogFooter>
          {!paymentSuccess && (
            <button onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
