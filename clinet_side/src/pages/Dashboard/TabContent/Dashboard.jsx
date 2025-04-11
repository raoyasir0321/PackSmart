import React, { useEffect, useState } from "react";
// import { useOrder } from "src/api/hooks/useOrder";
import RecentOrders from "./RecentOrders";
// import { useOrder } from "src/api/hooks/useOrder";
import { useOrderNumbers } from "../../../api/queries/useOrder";
import { useAuth } from "../../../../src/Context/AuthContext";

function Dashboard({ onEditAccount, location, isMobileScreen }) {
  // const{ myOrders} = useOrder()

  // const {data:orders ,isLoading:isGetting } = myOrders

  // const getStatusClass = (status) => {
  //   if (status === "INITIATED") return "orange";
  //   if (status === "PLACED") return "green";
  //   if (status === "DELIVERED") return "blue";
  //   return "text-gray-600";
  // };

  const [orderNumbers, setOrderNumbers] = useState({
    INITIATED: 0,
    PLACED: 0,
    DELIVERED: 0,
    COMPLETED: 0,
  });
  const { data: orders, isLoading: isGetting } = useOrderNumbers();
  console.log("orders", orders);

  const statuses = {
    COMPLETED: "COMPLETED",
    INITIATED: "INITIATED",
    PLACED: "PLACED",
    DELIVERED: "DELIVERED",
  };

  useEffect(() => {
    if (orders) {
      calculateOrderNumbers(orders);
    }
  }, [orders]);

  const calculateOrderNumbers = (orders) => {
    const updatedOrderNumbers = orders.reduce(
      (acc, order) => {
        acc[order._id] = order.count;
        return acc;
      },
      { ...orderNumbers }
    );

    setOrderNumbers(updatedOrderNumbers);
  };

  const { user, isLoading } = useAuth();
  console.log("user", user);

  return (
    <div className="account-inner">
      <span>Hello, {user.firstName}</span>
      <p>
        From your account dashboard. you can easily check &amp; view your{" "}
        <a href="#recent-order">Recent Orders</a>, manage your{" "}
        <a href="#" id="edit-address-btn">
          Shipping and Billing Addresses
        </a>{" "}
        and edit your <a href="#">Password</a> and{" "}
        <a href="#" id="edit-address-btn">
          Account Details
        </a>
        .
      </p>
      <div className="row">
        <div className="col-xl-4 col-lg-6 col-md-12">
          <div className="account-info">
            <div className="top-heading">
              <span>ACCOUNT INFO</span>
            </div>
            <div className="info-inner">
              <div className="d-flex align-items-center pb-3">
                <img src="/images/user-img.png" alt="" />
                <div className="mb-0">
                  <span>
                    {user.firstName} {user.lastName}{" "}
                  </span>
                  {/* <p>Dhaka - 1207, Bangladesh</p> */}
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center mt-3">
                <span>Email:</span>
                <p className="ms-2">{user.email}</p>
              </div>
              {/* <div className="d-flex align-items-center mt-3">
                <span>Sec Email:</span>
                <p className="ms-2">kevin12345@gmail.com</p>
              </div> */}
              <div className="d-flex align-items-center mt-3">
                <span>Phone:</span>
                <p className="ms-2"> {user.phoneNumber}</p>
              </div>
              <a
                href="#"
                id="edit-account-btn"
                className="btn btn-theme-outline mt-3"
                onClick={onEditAccount}
              >
                EDIT ACCOUNT
              </a>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-12"></div>
        <div className="col-xl-4 col-lg-12 col-md-12">
          <div className="order-count">
            <div className="total-orders">
              <img src="/images/total-order.png" alt="" />
              <div className="mb-0">
                <span>
                  {orderNumbers.INITIATED +
                    orderNumbers.PLACED +
                    orderNumbers.DELIVERED +
                    orderNumbers.COMPLETED}
                </span>
                <p>Total Orders</p>
              </div>
            </div>
            <div className="pending-orders">
              <img src="/images/pending-order.png" alt="" />
              <div className="mb-0">
                <span>{orderNumbers.PLACED}</span>
                <p>Pending Orders</p>
              </div>
            </div>
            <div className="completed-orders">
              <img src="/images/complete-order.png" alt="" />
              <div className="mb-0">
                <span>{orderNumbers.COMPLETED}</span>
                <p>Completed Orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="payment-sec">
            <div className="top-heading">
              {/* <span>PAYMENT OPTION</span> */}
              {/* <a href="#">
                Add Card <i className="fa fa-angle-right ms-2" />
              </a> */}
            </div>
            {/* <div className="info-inner">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 col-6">
                  <img src="/images/" />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-6">
                  <img src="/images/p-img-2.png" />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="row" id="recent-order">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="recent-order">
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
