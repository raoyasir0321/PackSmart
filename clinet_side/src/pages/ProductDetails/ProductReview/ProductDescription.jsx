import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import image1 from "../../../assets/images/medal.png";
import image2 from "../../../assets/images/truck.png";
import image3 from "../../../assets/images/handshake.png";
import image4 from "../../../assets/images/headphones.png";
import image5 from "../../../assets/images/creditcard.png";
import { amoutRateConversion } from "../../../utils/Helper";

const ProductDescription = ({ productInfo, isMobileScreen }) => {
  const shippingInfo = useMemo(() => {
    const shippingInfo = Object.values(productInfo.shipping_template_options);
    return shippingInfo || [];
  }, [productInfo?.product_head?.[0]?.product_id]);

  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";

  return (
    <div
      className="tab-pane fade active show"
      id="product-description"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      <div className={`row ${isMobileScreen ? "mt-0" : "mt-3"}`}>
        <div className="col-xl-6 col-lg-6 col-md-4">
          <h2>Description</h2>
          {/* <p className="desc" style={{ whiteSpace: "pre-wrap" }}>
            {text}
          </p> */}
          <DescriptionComponent
            description={productInfo?.product_head[0]?.ldesc}
          />
        </div>
        <div className="col-xl-3 col-lg-3 col-md-4">
          <h2>Feature</h2>
          <div className="feature-info">
            {/* <div className="d-flex align-items-center gap-2 mb-3">
              <img src={image1} alt="warranty" />
              <span>Free 1 Year Warranty</span>
            </div> */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src={image3}
                alt="moneyback"
                style={{ height: isMobileScreen && "20px" }}
              />
              <span>100% Money-back guarantee</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src={image4}
                alt="support"
                style={{ height: isMobileScreen && "20px" }}
              />
              <span>24/7 Customer support</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src={image5}
                alt="paymentsecurity"
                style={{ height: isMobileScreen && "20px" }}
              />
              <span>Secure payment method</span>
            </div>
          </div>
        </div>
        {shippingInfo.length > 0 && (
          <div className="col-xl-3 col-lg-3 col-md-4">
            <h2>Shipping Information</h2>
            {shippingInfo.map((item) => (
              <div
                className="shipping-info"
                key={item.shipping_template_option_id}
              >
                <p>
                  {`${item.shipping_title}: `}
                  <span>
                    {" "}
                    {`${item.transit_time}, ${amoutRateConversion(
                      item.shipping_price,
                      currencyRate,
                      currencyCode
                    )}`}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;

const DescriptionComponent = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [exceeds, setExceeds] = useState(false);

  // Function to strip HTML tags using DOMParser
  const stripHtmlTags = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Strip the HTML from the description
  const plainDescription = stripHtmlTags(description);

  // Split the description into lines
  const lines = plainDescription.split("\n");

  // Check if the description exceeds 300 characters
  const checkExceedsLimits = () => {
    if (plainDescription.length > 300) {
      setExceeds(true);
    } else {
      const first300Chars = plainDescription.slice(0, 300);
      const first300Lines = first300Chars.split("\n");
      if (first300Lines.length > 5) {
        setExceeds(true);
      } else {
        setExceeds(false);
      }
    }
  };

  // Use effect to check the limits initially
  useEffect(() => {
    checkExceedsLimits();
  }, [plainDescription]);

  // Content to display based on expansion state
  let content;
  if (isExpanded) {
    content = plainDescription;
  } else {
    // Get the first 300 characters
    const first300Chars = plainDescription.slice(0, 300);
    // Split them into lines
    const first300Lines = first300Chars.split("\n");
    // Limit to the first 5 lines
    const limitedLines = first300Lines.slice(0, 5);
    content = limitedLines.join("\n");
    // Add ellipsis if the content exceeds limits
    if (exceeds) {
      content += "...";
    }
  }

  return (
    <>
      {content ? (
        <div>
          <p className="desc" style={{ whiteSpace: "pre-wrap" }}>
            {content}
          </p>
          {exceeds && (
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="btn btn-theme-outline mt-1 mb-3"
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
          )}
        </div>
      ) : (
        <div>
          <p className="desc" style={{ fontSize: "17px", fontWeight: "600" }}>
            No Description
          </p>
        </div>
      )}
    </>
  );
};
