import React from "react";
import logo from "../../assets/images/smartLogo.png";

import google from "../../assets/images/google-play.png";
import apple from "../../assets/images/app-store.png";
import { Link } from "react-router-dom";
import { useCategories } from "../../../src/api/hooks/useCategories";

function FooterMain() {
  const { fetchAllCategoriesWithSections } = useCategories();
  const { data: categoresWithSections, isLoading: isGetting } =
    fetchAllCategoriesWithSections;
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-12">
            <div className="footer-logo flex flex-col items-start gap-4">
              <Link to="/" className="inline-block">
                <img
                  src={logo}
                  alt="footer-logo"
                  className="h-36 w-auto object-contain transition-transform duration-200 hover:scale-90"
                />
              </Link>

              <div>
                <p>Customer Supports:</p>
                <span className="font-semibold">(629) 555-0129</span>
              </div>

              <div>
                <p>College Lane Campus,Uk,AL10 9AB</p>
                <span className="font-semibold">packsmart@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-6 col-6">
            <div className="footer-links">
              <h6>Top Category</h6>
              {categoresWithSections?.slice(0, 7).map((category) => (
                <ul className="list-unstyled">
                  <li>
                    <Link to={`/section/${category._id}`}>{category.name}</Link>
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-6 col-6">
            <div className="footer-links">
              <h6>Quick links</h6>
              <ul className="list-unstyled">
                <li>
                  {/* <Link to="/">Shop Product</Link> */}
                  {/* <Link to="/category">Shop Product</Link> */}
                </li>
                <li>
                  {/* <Link to="/">Shopping Cart</Link> */}
                  <Link to="/my-cart">Shopping Cart</Link>
                </li>
                <li>
                  {/* <Link to="/">Wishlist</Link> */}
                  <Link to="/wishlist">Wishlist</Link>
                </li>

                <li>
                  {/* <Link to="/">Track Order</Link> */}
                  {/* <Link to="/login">Track Order</Link> */}
                </li>
                {/* <li>
                  <Link to="/customer-help">Customer Help</Link>
                </li> */}
                <li>
                  {/* <Link to="/">About Us</Link> */}
                  {/* <Link to="/about-us">About Us</Link> */}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-12">
            <div className="footer-links">
              <h6>Download APP</h6>
              {/* <Link to={"/"}> */}
              <Link to={"/coming-soon"}>
                <img
                  src={google}
                  alt="Google Play"
                  // style={{
                  //   height: isMobileScreen ? "37px" : "47px",
                  //   width: isMobileScreen ? "96px" : "116px",
                  // }}
                  className="footerImgStyle"
                />
              </Link>
              {/* <Link to={siteSettingsData?.applestore_link || "/"}> */}
              {/* <Link to={"/"}> */}
              <Link to={"/coming-soon"}>
                <img
                  src={apple}
                  alt="Apple Store"
                  // style={{
                  //   height: isMobileScreen ? "38px" : "47px",
                  //   width: isMobileScreen ? "97px" : "117px",
                  //   marginRight: isMobileScreen ? "6px" : "0px",
                  // }}
                />
              </Link>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-12">
            <div className="footer-links">
              <h6>Popular Sections</h6>

              <div className="tag flex flex-wrap gap-2">
                {[
                  ...new Set(
                    categoresWithSections
                      ?.flatMap((cat) => cat?.sections?.map((sec) => sec))
                      .filter(Boolean)
                  ),
                ]
                  .slice(0, 15)
                  .map((sec, idx) => (
                    <Link
                      key={idx}
                      to={`/section-products/${sec._id}`}
                      state={{
                        sectionId: sec._id,
                        fromSection: true,
                      }}
                      className="text-sm text-gray-500 hover:text-blue-500"
                    >
                      {sec.name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterMain;
