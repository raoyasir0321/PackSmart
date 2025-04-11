import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dashboardIcon from "../../assets/images/DashboardIcon.png";
import orderHistoryIcon from "../../assets/images/OrderHistoryIcon.png";
import trackOrderIcon from "../../assets/images/TrackOrderIcon.png";
import voucherIcon from "../../assets/images/voucher-icon.png";
import shoppingCartIcon from "../../assets/images/CartIcon.png";
import wishlistIcon from "../../assets/images/FavouriteIcon.png";
import addressIcon from "../../assets/images/Cards&AddIcon.png";
import settingIcon from "../../assets/images/SettingsIcon.png";
import changepassIcon from "../../assets/images/ChangePassIcon.png";
import logoutIcon from "../../assets/images/LogoutIcon.png";
// import BrowsingHistory from "./MyAccountContent/BrowsingHistory";
// import ChangePassword from "./MyAccountContent/ChangePassword";

// import {
//   clearOrderDataHandler,
//   clearShipAddressHandler,
// } from "../../redux/actions/OrderAction";
// import { clearCart } from "../../redux/actions/CategoryActions";
// import Settings from "./MyAccountContent/Settings";
// // import loader from "../../assets/images/loader.gif";
// import TrackOrder from "./MyAccountContent/TrackOrder/TrackOrder";
// // import { CLEAR_FAVORITES } from "../../redux/constant/constants";
// import Coupons from "./MyAccountContent/Coupons";
// import CardnAddress from "./MyAccountContent/Address/CardnAddress";
// import CancelOrder from "./MyAccountContent/CancelOrder/CancelOrder";
import Dashboard from "./TabContent/Dashboard";
import OrderHistory from "./TabContent/OrderHistory";
import TabLink from "./TabLink";
import TabContent from "./TabContent";
import TrackOrder from "./TabContent/TrackOrder";
import ChangePassword from "./TabContent/ChangePassword";
import Settings from "./TabContent/Settings";
import Voucher from "./TabContent/Voucher";
import CardnAddress from "./TabContent/CardnAddress";

const MyAccount = () => {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //   const iconID = useSelector((state) => state.tabsId?.id);
  //   const globalID = useSelector((state) => state.tabsId?.globalID);

  //   const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const [dataloading, setDataLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [activeTab, setActiveTab] = useState("v-pills-dashboard");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobileScreen(mediaQuery.matches);

    const handleResize = () => {
      setIsMobileScreen(mediaQuery.matches);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) return;
  //   navigate("/login");
  // }, []);

  //   useEffect(() => {
  //     if (!loginData?.token) {
  //       navigate("/login");
  //     }
  //   }, []);

  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  //   useEffect(() => {
  //     dispatch(handleRemoveGlobalId());
  //   }, [globalID]);

  //   useEffect(() => {
  //     if (!globalID) {
  //       dispatch(handleRemoveIconId("v-pills-dashboard"));
  //     } else {
  //       dispatch(handleRemoveGlobalId());
  //     }
  //   }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.className = "menu-open";
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isSidebarOpen]);

  // const handleTabClick = (id) => {
  //   onTop();
  //   dispatch(handleIconId(id));
  //   setIsSidebarOpen(false);
  // };

  const handleTabClick = (id) => {
    onTop();
    // document.body.classList.remove("menu-open");
    // dispatch(handleIconId(id));
    setIsSidebarOpen(false);
    setActiveTab(id);
    // dispatch(handleCancelOrderViewFlag(false));
    if (id !== "v-pills-address") {
      //   dispatch(handleSetAddAddress(false));
    }

    if (id !== "v-pills-order") {
      //   dispatch(handleStatusFlag(false));
    }

    // if (id !== "v-pills-cancel") {
    // }
  };

  //   const clearCookies = () => {
  //     document.cookie = "__stripe_mid=;  path=/;";
  //     document.cookie = "__stripe_sid=;  path=/;";
  //     document.cookie = "mypswd=;  path=/;";
  //   };

  const logoutHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    localStorage.clear();
    document.body.classList.remove("menu-open");
    // dispatch(logoutHandlerAction());
    // clearCookies();
    // dispatch(clearAddressData());
    // dispatch(handleRemoveIconId("v-pills-dashboard"));
    // dispatch(clearOrderDataHandler());
    // dispatch(clearCart());
    // dispatch(clearShipAddressHandler());
    // dispatch({ type: CLEAR_FAVORITES });
  };

  //   if (dataloading) {
  //     return (
  //       <div
  //         className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center align-items-center flex-grow-1 my-4"
  //         style={{ minHeight: "100vh" }}
  //       >
  //         <img
  //           src={loader}
  //           alt="Loading Related Products"
  //           style={{
  //             maxWidth: isMobileScreen ? "70px" : "150px",
  //           }}
  //         />
  //       </div>
  //     );
  //   }

  const tabsLinkData = [
    {
      type: "tab",
      targetId: "#dashboard",
      id: "v-pills-dashboard",
      label: "Dashboard",
      icon: dashboardIcon,
    },
    {
      type: "tab",
      targetId: "#order",
      id: "v-pills-order",
      label: "My Orders",
      icon: orderHistoryIcon,
    },
    {
      type: "tab",
      targetId: "#track",
      id: "v-pills-track",
      label: "Track Order",
      icon: trackOrderIcon,
    },
    // {
    //   type: "tab",
    //   targetId: "#cancelorder",
    //   id: "v-pills-cancel",
    //   label: "My Cancellations",
    //   icon: orderHistoryIcon,
    // },
    // {
    //   type: "tab",
    //   targetId: "#voucher",
    //   id: "v-pills-voucher-tab",
    //   label: "Coupons",
    //   icon: voucherIcon,
    // },
    // {
    //   type: "tab",
    //   targetId: "#track",
    //   id: "v-pills-track",
    //   label: "Track Order",
    //   icon: trackOrderIcon,
    // },

    {
      type: "link",
      to: "/my-cart",
      label: "Shopping Cart",
      icon: shoppingCartIcon,
    },
    {
      type: "link",
      to: "/wishlist",
      label: "Wishlist",
      icon: wishlistIcon,
    },
    // {
    //   type: "tab",
    //   targetId: "#address",
    //   id: "v-pills-address",
    //   label: "Card and Address",
    //   icon: addressIcon,
    // },

    {
      type: "tab",
      targetId: "#settings",
      id: "v-pills-settings",
      label: "Settings",
      icon: settingIcon,
    },
    {
      type: "tab",
      targetId: "#password",
      id: "v-pills-password",
      label: "Change Password",
      icon: changepassIcon,
    },
    {
      type: "link",
      label: "Logout",
      icon: logoutIcon,
      logoutHandler: logoutHandler,
      to: "/",
    },
  ];

  const tabsContentData = [
    {
      id: "dashboard",
      arialabelledbyID: "v-pills-dashboard",
      content: (
        <Dashboard
          location={location?.pathname}
          isMobileScreen={isMobileScreen}
          onEditAccount={() => handleTabClick("v-pills-settings")}
        />
      ),
    },
    {
      id: "order",
      arialabelledbyID: "v-pills-order",
      content: <OrderHistory isMobileScreen={isMobileScreen} />,
    },
    {
      id: "track",
      arialabelledbyID: "v-pills-track",
      content: <TrackOrder isMobileScreen={isMobileScreen} />,
    },
    {
      id: "voucher-tab",
      arialabelledbyID: "v-pills-voucher-tab",
      content: <Voucher isMobileScreen={isMobileScreen} />,
    },
    {
      id: "address",
      arialabelledbyID: "v-pills-address",
      content: <CardnAddress location={location?.pathname} />,
    },
    // {
    //   id: "browsing",
    //   arialabelledbyID: "v-pills-browsing",
    //   content: <BrowsingHistory />,
    // },
    {
      id: "settings",
      arialabelledbyID: "v-pills-settings",
      content: <Settings isMobileScreen={isMobileScreen} />,
    },
    {
      id: "password",
      arialabelledbyID: "v-pills-password",
      content: <ChangePassword isMobileScreen={isMobileScreen} />,
    },
  ];

  // const getActiveMenuLabel = () => {
  //   const activeTab = tabsLinkData.find((tab) => tab.id === iconID);
  //   return activeTab ? activeTab.label : "Menu";
  // };

  return (
    <section className="user-account">
      <div className="container">
        <div className="row">
          {/* Hamburger menu for mobile */}
          <div className="d-md-none">
            {/* <button onClick={toggleSidebar} className="btn btn-primary mb-3">
              ≡ Menu
            </button> */}

            <button
              onClick={toggleSidebar}
              className="btn btn-theme-yellow d-flex align-items-center justify-content-center"
            >
              <span style={{ fontSize: "17px", marginRight: "8px" }}>
                ≡ Menu
              </span>
              {/* <span style={{ fontSize: "15px" }}>{getActiveMenuLabel()}</span> */}
            </button>
          </div>

          {/* Sidebar */}

          <div
            className={`col-xl-3 col-lg-3 col-md-4 sidebar ${
              isSidebarOpen ? "open" : ""
            }`}
          >
            <div className="account-tabs sticky-md-top" style={{ zIndex: 1 }}>
              <div className="d-block align-items-start">
                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {tabsLinkData.map((tab, index) =>
                    tab?.type === "tab" ? (
                      <TabLink
                        key={tab.id}
                        targetId={tab.targetId}
                        id={tab.id}
                        to={tab.targetId}
                        label={tab.label}
                        icon={tab.icon}
                        Active={activeTab === tab.id}
                        onClick={() => {
                          handleTabClick(tab.id);
                          //   alert(tab.id);
                        }}
                      />
                    ) : (
                      <Link
                        key={index}
                        to={tab.to}
                        className="nav-link"
                        type="button"
                        onClick={() => {
                          if (tab.logoutHandler) {
                            tab.logoutHandler();
                          } else {
                            document.body.classList.remove("menu-open");
                          }
                        }}
                      >
                        <img
                          src={tab.icon}
                          className="me-2"
                          alt={tab.label}
                          style={{ width: "20px" }}
                        />
                        {tab.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content area */}

          <div className="col-xl-9 col-lg-9 col-md-8">
            <div className={`account-body ${isMobileScreen && "mt-0"}`}>
              <div className="tab-content" id="v-pills-tabContent">
                {tabsContentData
                  .filter((item) => activeTab === `v-pills-${item.id}`)
                  .map((tab) => (
                    <TabContent
                      key={tab.id}
                      id={tab.id}
                      arialabelledbyID={tab.arialabelledbyID}
                      content={tab.content}
                      isShow={activeTab === `v-pills-${tab.id}`}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Semi-transparent overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </section>
  );
};

export default MyAccount;
