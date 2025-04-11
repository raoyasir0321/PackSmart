import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import currencies from "@/utils/currencies";
import { useOrder } from "../../api/hooks/useOrder";
import { useCart } from "../../Context/CartContext";
import PaymentModal from "../../components/paymentModal";
//  animations

import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
import Tilt from "react-parallax-tilt";
import LocomotiveScroll from "locomotive-scroll";
import { Howl } from "howler";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { Tooltip } from "react-tooltip";
import MagneticButton from "@/components/MagneticBtn";
function Cart() {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart } = useCart();
  const { createOrder } = useOrder();
  const { isPending: isOrderPending, error: orderError } = createOrder;

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const discount = 0;
  const total = subtotal - discount + shipping;

  const handleIncrement = (item) => {
    updateCartItem(item.id, item.size, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateCartItem(item.id, item.size, item.quantity - 1);
    } else {
      removeFromCart(item);
    }
  };

  const handleOrder = async () => {
    const orderItems = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
      ...(item.size && {
        size: [
          {
            name: item.size,
            quantity: item.quantity,
            price: item.price,
          },
        ],
      }),
    }));

    try {
      const result = await createOrder.mutateAsync({ orderItem: orderItems });
      if (result.order) {
        setOrderData(result.order);
        setShowPaymentModal(true);
      }
    } catch (err) {
      console.error("Order creation failed:", err);
    }
  };

  const handleDebitCreditPayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      navigate("/order-confirm", {
        state: {
          order: orderData,
          orderItems: cart,
        },
      });
      resetModalState();
    }, 2000);
  };

  const handlePayPalSuccess = (captureData) => {
    console.log("PayPal success data:", captureData);
    setPaymentSuccess(true);
    setTimeout(() => {
      navigate("/order-confirm", {
        state: {
          order: orderData,
          orderItems: cart,
        },
      });
      resetModalState();
    }, 2000);
  };

  const resetModalState = () => {
    setShowPaymentModal(false);
    setPaymentMethod(null);
    setPaymentSuccess(false);
  };
  //  animations
  const scrollRef = useRef(null);
  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.1,
      multiplier: 1.2,
    });

    return () => {
      scroll.destroy();
    };
  }, []);

  const clickSound = new Howl({
    src: ["/sounds/click.mp3"],
    volume: 0.5,
  });
  return (
    <>
      <section ref={scrollRef} className="cart bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-6 bg-white shadow-xl rounded-lg">
              <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <ShoppingCart size={28} className="text-blue-600" /> My Cart
              </h1>

              <div className="hidden lg:grid grid-cols-[1.5fr_1fr_1fr_1fr] text-lg font-semibold text-gray-700 border-b pb-2">
                <span>Product</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total</span>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-lg mt-6">
                  Your cart is empty.
                </p>
              ) : (
                <div
                  className="overflow-y-auto max-h-[500px] pr-2 space-y-4"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {cart.map((item, index) => (
                    <animated.div
                      key={index}
                      className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center py-4 border-b transition-transform hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            removeFromCart(item);
                            clickSound.play();
                          }}
                          data-tooltip-id="removeItem"
                        >
                          <Trash2
                            className="text-red-500 hover:text-red-700 transition-all cursor-pointer"
                            size={20}
                          />
                        </button>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-lg text-gray-800 font-medium">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Color: {item.color || "N/A"} | Size:{" "}
                            {item.size || "N/A"}
                          </p>
                          <div className="flex gap-2 mt-1 text-blue-600 text-xs">
                            <button className="hover:underline">Edit</button> |
                            <button className="hover:underline">
                              Save for Later
                            </button>
                          </div>
                        </div>
                      </div>

                      <span className="text-gray-700 font-semibold text-center">
                        {item.price.toFixed(2)} £
                      </span>

                      <div className="flex items-center gap-2 justify-center">
                        <button
                          className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition"
                          onClick={() => handleDecrement(item)}
                        >
                          <Minus size={18} />
                        </button>
                        <input
                          type="number"
                          className="w-12 text-center text-gray-800 border rounded-md"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition"
                          onClick={() => handleIncrement(item)}
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      <span className="text-gray-900 font-bold text-right">
                        £{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </animated.div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex justify-between items-center">
                <Link to="/" className="text-blue-600 hover:underline text-sm">
                  &larr; Continue Shopping
                </Link>
                <div className="text-gray-900 font-bold text-lg">
                  Subtotal: £
                  {cart
                    .reduce((sum, i) => sum + i.price * i.quantity, 0)
                    .toFixed(2)}
                </div>
              </div>
            </div>

            <div className="p-6 bg-white shadow-xl rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Cart Totals
              </h2>

              <div className="mb-16 border-b-2 ">
                {/* <input
                  type="text"
                  placeholder="Enter promo code"
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
                <button className="mt-2 w-full bg-black text-white p-2 rounded-md hover:bg-gray-900 transition">
                  Apply
                </button> */}
              </div>

              <div className="space-y-4 text-lg">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-900">
                    £
                    {cart
                      .reduce((sum, i) => sum + i.price * i.quantity, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-bold text-gray-900">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span className="font-bold text-green-500">- £0.00</span>
                </div>
                <div className="flex justify-between font-bold text-xl">
                  <span>Total:</span>
                  <span>
                    £
                    {cart
                      .reduce((sum, i) => sum + i.price * i.quantity, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              {/* <p className="mt-2 text-sm text-red-500 text-center">
                Spend £50 more to qualify for FREE Shipping!
              </p> */}

              <div className="flex justify-center mt-6">
                <MagneticButton onClick={handleOrder}>
                  Proceed to Checkout
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        <Tooltip id="removeItem" place="top" content="Remove item from cart" />
      </section>

      <PaymentModal
        show={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        paymentSuccess={paymentSuccess}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        orderData={orderData}
        onPayPalSuccess={handlePayPalSuccess}
        onDebitCreditPayment={handleDebitCreditPayment}
      />
    </>
  );
}

export default Cart;
