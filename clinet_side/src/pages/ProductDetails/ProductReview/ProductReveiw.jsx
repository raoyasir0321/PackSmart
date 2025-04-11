import React, { useEffect, useState } from "react";
import ProductDescription from "./ProductDescription";
import ProductAdditionalInformation from "./ProductAdditionalInformation";
import ProductReveiwsTab from "./ProductReveiwsTab";
import { useDispatch, useSelector } from "react-redux";
import { RESET_REVIEW_PERMISSION } from "../../../redux/constant/constants";
import { fetchProductReviewPermission } from "../../../redux/actions/CategoryActions";
import { useNavigate } from "react-router-dom";

const tabs = [
  { title: "PRODUCT DESCRIPTION", id: "nav-home-tab" },
  { title: "ADDITIONAL INFORMATION", id: "nav-profile-tab" },
  { title: "REVIEWS", id: "nav-contact-tab" },
];

const ProductReveiw = ({ productInfo, selectedVariant, isMobileScreen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const token = loginData?.token;

  let reviewPermission = useSelector(
    (state) => state?.setProductReviewPermission?.reviewPermission
  );

  let productDetails;

  if (
    productInfo?.variant_combo_reference &&
    Object.values(productInfo?.variant_combo_reference)?.length > 0
  ) {
    const matchedVariantKey = Object.keys(
      productInfo?.variant_combo_reference
    ).find((key) => key === selectedVariant.join(","));

    const matchedVariant =
      productInfo?.variant_combo_reference[matchedVariantKey];
    productDetails = matchedVariant?.variant_combo_id;
  } else {
    productDetails = 0;
  }

  const finalId = `${productInfo?.product_head?.[0]?.product_id}-${productDetails}`;

  useEffect(() => {
    dispatch({ type: RESET_REVIEW_PERMISSION });
    if (!token) {
      return;
    }

    if (token && finalId) {
      dispatch(fetchProductReviewPermission(finalId, token, navigate));
    }
  }, [finalId]);

  const [activeTab, setActiveTab] = useState(tabs[0].title);
  return (
    <section className="reviews">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="border pt-3 pb-2">
              <nav>
                <div className="nav nav-tabs justify-content-center">
                  {tabs.map((tab, index) => {
                    return (
                      <button
                        key={index}
                        className={`nav-link ${
                          tab.title === activeTab ? "active" : ""
                        }`}
                        id={tab.id}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab(tab.title);
                        }}
                      >
                        {tab.title}
                      </button>
                    );
                  })}
                </div>
              </nav>
              <div className="tab-content pt-3 pb-2 px-3">
                {activeTab === "PRODUCT DESCRIPTION" ? (
                  <ProductDescription
                    productInfo={productInfo}
                    isMobileScreen={isMobileScreen}
                  />
                ) : activeTab === "ADDITIONAL INFORMATION" ? (
                  <ProductAdditionalInformation
                    productInfo={productInfo}
                    selectedVariant={selectedVariant}
                    isMobileScreen={isMobileScreen}
                  />
                ) : (
                  <ProductReveiwsTab
                    productInfo={productInfo}
                    reviewPermission={reviewPermission}
                    selectedVariant={selectedVariant}
                    isMobileScreen={isMobileScreen}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReveiw;
