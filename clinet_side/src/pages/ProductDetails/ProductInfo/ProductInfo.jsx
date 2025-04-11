import React, { useEffect, useState } from "react";
import StarRating from "../../../components/StarRating/StarRating";
import minusImage from "../../../assets/images/minus.png";
import plusImage from "../../../assets/images/plus.png";
import whishlistImage from "../../../assets/images/wishlist.png";
import gauranteeImage from "../../../assets/images/payment.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { amoutRateConversion, getVariantsArray } from "../../../utils/Helper";
import VariantItem from "./VariantItem";
import {
  ADD_QUANTITY,
  ADD_TO_CART,
  DELETE_FAVORITE_PRODUCT,
  POST_FAVORITE_PRODUCT,
} from "../../../redux/constant/constants";
import { MyToast, toast } from "../../../components/Toast/MyToast";
import Modal from "react-bootstrap/Modal";
import TextShortener from "../../../components/DynamicText/TextShortner";

const ProductInfo = ({
  transformedData,
  selectedVariant,
  setSelectedVariants,
  isMobileScreen,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favoriteSetting, setFavoriteSetting] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";
  const favourites = useSelector((state) => state?.handleCartItem?.favorites);
  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);
  let variants = [];
  if (transformedData?.has_variants_selected) {
    variants = getVariantsArray(transformedData?.variant_types);
  }
  const isVariant = transformedData.has_variants_selected === 1;

  let currentVariant = {};

  if (isVariant) {
    currentVariant =
      transformedData?.variant_combo_reference?.[selectedVariant.join(",")];
  }

  useEffect(() => {
    if (transformedData?.has_variants_selected) {
      const initialValidVariant = findFirstValidVariantCombination();
      setSelectedVariants(initialValidVariant);
    }
  }, [transformedData]);

  const findFirstValidVariantCombination = () => {
    const variantComboReference =
      transformedData?.variant_combo_reference || {};
    const variants = getVariantsArray(transformedData?.variant_types);

    // first valid combination from variant_combo_reference
    const firstValidCombo = Object.keys(variantComboReference)[0];
    if (firstValidCombo) {
      return firstValidCombo.split(",");
    }

    // If no valid combination found
    return new Array(variants.length).fill("0");
  };

  const handleAddToCart = (quantity) => {
    const cartItem = transformProductInToCartItem(
      transformedData,
      isVariant,
      currentVariant
    );

    // console.log("cartItem", cartItem);
    if (isCarted) {
      if (isCarted.quantity + selectedQuantity > isCarted.stock) {
        toast.clearWaitingQueue();
        MyToast(
          `Current available stock is ${isCarted.stock}, please reduce ${
            isCarted.quantity + selectedQuantity - isCarted.stock
          }`,
          "error",
          "rgba(217,92,92,.95)"
        );
        return;
      }
      dispatch({
        type: ADD_QUANTITY,
        payload: cartItem,
        quantity: selectedQuantity,
      });
    } else {
      if (cartItem.stock < selectedQuantity) {
        toast.clearWaitingQueue();
        MyToast(
          `Current available stock is ${cartItem.stock}, please reduce ${
            selectedQuantity - cartItem.stock
          }`,
          "error",
          "rgba(217,92,92,.95)"
        );
        return;
      }
      dispatch({
        type: ADD_TO_CART,
        payload: cartItem,
        stock: cartItem?.product_quantity,
        quantity: selectedQuantity,
      });
    }
    MyToast(
      "item added to cart successfully",
      "success",
      "rgba(91,189,114,.95)"
    );
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setSelectedQuantity(value);
    } else {
      setSelectedQuantity("");
    }
  };

  const handleQuantityBlur = () => {
    if (selectedQuantity === "" || parseInt(selectedQuantity, 10) < 1) {
      setSelectedQuantity(1);
    } else {
      setSelectedQuantity(parseInt(selectedQuantity, 10));
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      navigate("/my-cart");
    }, 400);
  };

  const handleAddToWishList = () => {
    if (favoriteSetting) {
      return;
    }
    if (!loginData?.token) {
      setShowModal(true); // Show modal if the user is not logged in
      return;
    }
    const cartItem = transformProductInToCartItem(
      transformedData,
      isVariant,
      currentVariant
    );
    if (isFavorite) {
      dispatch({
        type: DELETE_FAVORITE_PRODUCT,
        payload: cartItem,
        setIsLoading: setFavoriteSetting,
        navigate,
      });
    } else {
      dispatch({
        type: POST_FAVORITE_PRODUCT,
        payload: cartItem,
        setIsLoading: setFavoriteSetting,
        navigate: navigate,
      });
    }
  };

  const inStock =
    (isVariant && currentVariant?.product_quantity > 0) ||
    (!isVariant && transformedData?.offer_data?.[0].product_quantity > 0);

  const stockShow =
    (isVariant && currentVariant?.product_quantity) ||
    (!isVariant && transformedData?.offer_data?.[0].product_quantity);

  // console.log("stockShow", stockShow);

  const isCarted = cartData.find((item) => {
    if (isVariant) {
      if (
        transformedData?.product_head?.[0].product_id === item.product_id &&
        currentVariant.variant_combo_id === item.variant_combo_id
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return item.product_id === transformedData?.product_head?.[0].product_id;
    }
  });

  const isFavorite = favourites?.find((item) => {
    if (isVariant) {
      return (
        item.product_id === transformedData?.product_head?.[0].product_id &&
        currentVariant.variant_combo_id === item.variant_combo_id
      );
    } else {
      return item.product_id === transformedData?.product_head?.[0].product_id;
    }
  });

  const handleClose = () => setShowModal(!showModal);

  const attributes = Object.values(transformedData?.attribute_payload || {});

  const validAttributes = attributes.filter((entry) => entry?.value);

  return (
    <>
      {showModal && (
        <>
          <Modal
            show={showModal}
            onHide={handleClose}
            centered={isMobileScreen ? true : false}
          >
            <div
              className="modal-md model-sec"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row align-items-center">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="model-discount">
                        <div className="d-block text-center align-items-center">
                          <span>Please Login or Create Account</span>
                          <button
                            onClick={(e) => setShowModal(false)}
                            className="btn-close"
                          ></button>
                        </div>
                        <div className="row">
                          <div className="col-xl-6 col-lg-6 col-md-6">
                            <Link
                              className="btn btn-theme mt-2 w-100"
                              to={"/login"}
                              state={
                                "/product/" +
                                transformedData?.product_head?.[0]?.product_slug
                              }
                            >
                              LOGIN
                            </Link>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6">
                            <Link
                              className="btn btn-theme-yellow mt-2 w-100"
                              to={"/login"}
                              state={"signup"}
                            >
                              SIGN UP
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
      <div
        key={
          "product-details-" +
          currentVariant +
          " " +
          transformedData?.product_head?.[0].product_id
        }
        className="detail-right"
      >
        <div
          key={"product-info-ratings"}
          className="d-md-flex align-items-center gap-2"
        >
          <div className="rating">
            <StarRating
              rating={transformedData?.product_head?.[0].product_rating || 0}
              isMobileScreen1={isMobileScreen}
            />
          </div>
          <span style={{ paddingTop: "4px" }}>{`${
            transformedData?.product_head?.[0].product_rating || 0
          } star rating`}</span>
          <small
            style={{ paddingTop: "4px", paddingLeft: isMobileScreen && "4px" }}
          >
            {/* {"("}
            {transformedData?.product_head?.[0].no_of_reviews} User feedback
            {")"} */}
          </small>
        </div>
        <h1>{transformedData?.product_head?.[0].product_name}</h1>
        <div key={"product-info-stock"} className="stock-detail">
          <div className="mb-0 w-50">
            <div
              className="d-flex align-items-center"
              style={{ paddingRight: "12px" }}
            >
              <p style={{ paddingRight: "6px" }}>Sku:</p>

              <TextShortener
                text={
                  isVariant
                    ? currentVariant?.seller_sku
                    : transformedData?.offer_data?.[0].seller_sku
                }
                textLimit={isMobileScreen ? 15 : 30}
                component={"p"}
                className={"toolTipClass"}
                tooltipStyle={{
                  bottom: "30px",
                }}
                textStyle={{
                  color: "#191c1f",
                  fontWeight: "500",
                  fontSize: isMobileScreen ? "14px" : "18px",
                }}
              />
            </div>

            <div
              className="d-flex align-items-center"
              style={{ paddingRight: "12px" }}
            >
              <p style={{ paddingRight: "6px" }}>Brand:</p>

              <TextShortener
                text={transformedData?.product_head?.[0].brand_name}
                textLimit={isMobileScreen ? 14 : 30}
                component={"p"}
                className={"toolTipClass"}
                tooltipStyle={{
                  bottom: "30px",
                }}
                textStyle={{
                  color: "#191c1f",
                  fontWeight: "500",
                  fontSize: isMobileScreen ? "14px" : "18px",
                }}
              />
            </div>
          </div>
          <div className="mb-0">
            <div className="d-flex align-items-center">
              <p style={{ paddingRight: "6px" }}>Availability:</p>
              {!inStock ? (
                <span style={{ color: "red", paddingBottom: "14px" }}>
                  {" "}
                  Out of Stock{" "}
                </span>
              ) : (
                <>
                  <div className="d-flex align-items-center">
                    <span
                      style={{
                        color: "green",
                        paddingRight: "2px",
                        paddingBottom: isMobileScreen ? "17px" : "15px",
                      }}
                    >
                      {" "}
                      In Stock{" "}
                    </span>
                    {stockShow > 0 && (
                      <TextShortener
                        text={"(" + stockShow + ")" || 0}
                        textLimit={isMobileScreen ? 6 : 14}
                        component={"p"}
                        className={"toolTipClass"}
                        tooltipStyle={{
                          bottom: "30px",
                        }}
                        textStyle={{
                          color: "#191c1f",
                          fontWeight: "500",
                          fontSize: isMobileScreen ? "14px" : "18px",
                        }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="d-flex align-items-center">
              <p style={{ paddingRight: "6px" }}>Category:</p>

              <TextShortener
                text={transformedData?.product_head?.[0].category_title}
                textLimit={isMobileScreen ? 12 : 28}
                component={"p"}
                className={"toolTipClass"}
                tooltipStyle={{
                  bottom: "30px",
                }}
                textStyle={{
                  color: "#191c1f",
                  fontWeight: "500",
                  fontSize: isMobileScreen ? "14px" : "18px",
                }}
              />
            </div>
          </div>
        </div>
        <div key={"product-info-price"} className="product-price">
          <span className="d-flex align-items-center">
            {isVariant && currentVariant?.sale_price > 0
              ? amoutRateConversion(
                  currentVariant?.sale_price,
                  currencyRate,
                  currencyCode
                )
              : transformedData?.offer_data?.[0].sale_price > 0 &&
                amoutRateConversion(
                  transformedData?.offer_data?.[0].sale_price,
                  currencyRate,
                  currencyCode
                ) + " "}
            {isVariant &&
              currentVariant?.price > 0 &&
              currentVariant?.sale_price !== currentVariant?.price && (
                <del style={{ paddingLeft: "5px" }}>
                  {amoutRateConversion(
                    currentVariant?.price,
                    currencyRate,
                    currencyCode
                  )}
                </del>
              )}
            {!isVariant &&
              transformedData?.offer_data?.[0].price > 0 &&
              transformedData?.offer_data?.[0].sale_price !==
                transformedData?.offer_data?.[0].price && (
                <div className="px-2 pb-1">
                  <del>
                    {amoutRateConversion(
                      transformedData?.offer_data?.[0].price,
                      currencyRate,
                      currencyCode
                    )}
                  </del>
                </div>
              )}
          </span>
          {isVariant &&
            currentVariant?.sale_price !== currentVariant?.price && (
              <span className="discount">{currentVariant?.discount} OFF</span>
            )}
          {!isVariant &&
            transformedData?.offer_data?.[0].sale_price !==
              transformedData?.offer_data?.[0].price && (
              <span className="discount">
                {transformedData?.offer_data?.[0].discount} OFF
              </span>
            )}
        </div>

        {isVariant &&
          variants.length > 0 &&
          variants.map((variantType, index) => {
            if (index % 2 === 0) {
              return (
                <div key={`variant-div-${index}`} className="variant">
                  <VariantItem
                    key={`variant-item-${index}-${variantType.key}`}
                    variant={variantType}
                    selectedVariant={selectedVariant || {}}
                    setSelectedVariants={setSelectedVariants}
                    variantComboReference={
                      transformedData?.variant_combo_reference
                    }
                    allVariants={variants}
                    isMobileScreen={isMobileScreen}
                  />
                  {variants[index + 1] && (
                    <VariantItem
                      key={`variant-item-${index + 1}-${variantType.key}`}
                      variant={variants[index + 1]}
                      selectedVariant={selectedVariant || {}}
                      setSelectedVariants={setSelectedVariants}
                      variantComboReference={
                        transformedData?.variant_combo_reference
                      }
                      allVariants={variants}
                      isMobileScreen={isMobileScreen}
                    />
                  )}
                </div>
              );
            }
          })}

        {transformedData?.attribute_payload && validAttributes?.length > 0 && (
          <>
            {selectedVariant?.length > 0 && (
              <div className="my-4 stylyProdDetail"></div>
            )}
            <div className="tab-pane fade active show">
              <div className="row mt-3">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <h2
                    className={`product-details-title ${
                      isMobileScreen ? "mb-2" : "mb-4"
                    }`}
                  >
                    Product Details
                  </h2>
                  {validAttributes.map((entry, index) => {
                    return (
                      <div key={index} className="row mb-3 product-attribute">
                        <div className="col-md-3 col-sm-5">
                          <p className="attribute-title">
                            {entry?.attribute_title}
                          </p>
                        </div>
                        <div className="col-md-9 col-sm-7">
                          <p className="attribute-value">{entry?.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        <div key={"product-info-cart"} className="add-cart">
          <div className="quantity">
            <span
              className={`minus ${selectedQuantity < 2 ? "disabled" : ""}`}
              onClick={(e) => setSelectedQuantity(selectedQuantity - 1 || 1)}
            >
              <img src={minusImage}></img>
            </span>
            <input
              type="number"
              className="count"
              value={selectedQuantity}
              onChange={handleQuantityChange}
              onBlur={handleQuantityBlur}
              min="1"
            />
            <span
              className="plus"
              onClick={(e) => setSelectedQuantity(selectedQuantity + 1)}
            >
              <img src={plusImage}></img>
            </span>
          </div>
          <div className="add-button">
            <Link
              to={"/my-cart"}
              className={`btn add-to-cart ${inStock ? "" : "disabled"}`}
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(selectedQuantity);
              }}
            >
              Add To Cart
              <i className="fa fa-shopping-cart ms-2" />
            </Link>
          </div>
          <div className="buy-button">
            <button
              className={`btn buy-now ${inStock ? "" : "disabled"}`}
              type="button"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
        <div key={"product-info-wishlist"} className="wishlist">
          <div
            className="add-wishlist"
            style={{ cursor: "pointer" }}
            onClick={handleAddToWishList}
          >
            {isFavorite ? (
              <i
                className="fa-sharp fa-solid fa-heart"
                style={{
                  height: "18px",
                  width: "18px",
                  fontSize: "18px",
                  display: "inline-block",
                }}
              />
            ) : (
              <i
                className="fa-sharp fa-regular fa-heart"
                style={{
                  height: "18px",
                  width: "18px",
                  fontSize: "18px",
                  display: "inline-block",
                }}
              />
            )}
            <span>
              {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
            </span>
          </div>
          {/* <div className="share-product">
            <a
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#959595",
              }}
            >
              Share Product:
            </a>
            <a
              href={siteSettingsData?.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href={siteSettingsData?.x_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div> */}
        </div>
        {/* <div key={"product-info-guarantee"} className="guarantee">
          <span>100% Guarantee Safe Checkout</span>
          <img src={gauranteeImage} alt="" />
        </div> */}
      </div>
    </>
  );
};

export default ProductInfo;

const transformProductInToCartItem = (data, isVariant, variantInfo) => {
  if (isVariant) {
    return {
      product_id: data?.product_head?.[0]?.product_id,
      product_name: data?.product_head?.[0]?.product_name,
      brand_name: data?.product_head?.[0]?.brand_name,
      created_at: data?.product_head?.[0]?.created_at,
      image_id: data?.product_images?.[0]?.image_id,
      price: variantInfo.price,
      product_quantity: variantInfo.product_quantity,
      discount: variantInfo.discount,
      amount_saved: variantInfo.amount_saved,
      sale_price: variantInfo.sale_price,
      sale_start_date: variantInfo.sale_start_date,
      sale_end_date: variantInfo.sale_end_date,
      variant_combo_id: variantInfo.variant_combo_id,
      product_rating: data?.product_head?.[0]?.product_rating,
      no_of_reviews: data?.product_head?.[0]?.no_of_reviews,
      image_path:
        data?.product_images?.[variantInfo.variant_combo_id]?.[0]?.image_path,
      stock: variantInfo.product_quantity,
      variant_name_combo: variantInfo.variant_name_combo,
      product_slug: data?.product_head?.[0]?.product_slug,
      variant_type_variant_combined_string:
        variantInfo?.variant_type_variant_combined_string,
    };
  }
  return {
    product_id: data?.product_head?.[0]?.product_id,
    product_name: data?.product_head?.[0]?.product_name,
    brand_name: data?.product_head?.[0]?.brand_name,
    created_at: data?.product_head?.[0]?.created_at,
    image_id: data?.product_images?.[0]?.image_id,
    price: data?.offer_data?.[0].price,
    product_quantity: data?.offer_data?.[0].product_quantity,
    discount: data?.offer_data?.[0].discount,
    amount_saved: data?.offer_data?.[0].amount_saved,
    sale_price: data?.offer_data?.[0].sale_price,
    sale_start_date: data?.offer_data?.[0].sale_start_date,
    sale_end_date: data?.offer_data?.[0].sale_end_date,
    variant_combo_id: data?.offer_data?.[0].variant_combo_id,
    product_rating: data?.product_head?.[0]?.product_rating,
    no_of_reviews: data?.product_head?.[0]?.no_of_reviews,
    image_path: data?.product_images?.[0]?.image_path,
    stock: data?.offer_data?.[0].product_quantity,
    product_slug: data?.product_head?.[0]?.product_slug,
  };
};
