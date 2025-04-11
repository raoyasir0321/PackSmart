import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsImages from "./ProductDetailsImages";
import CustomSelectOption from "../../../components/SelectOption/CustomSelectOption";
import currencies from "@/utils/currencies";
import { useCart } from "../../../Context/CartContext";
import { useCategoryContext } from "../../../Context/CategoryContext";
import { ShieldCheck, BadgeCheck, Lock } from "lucide-react";

const ProductView = ({ product: passedProduct, productId }) => {
  const { id } = useParams();
  const { categoryData, setCategoryData } = useCategoryContext();
  console.log("categoryContext", categoryData);
  const navigate = useNavigate();

  const [product, setProduct] = useState(passedProduct || null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const quantityRef = useRef(null);
  const { addToCart } = useCart();
  console.log("product", product);
  const isPromotion = product && product.isPromotional;
  useEffect(() => {
    setProduct(passedProduct);
  }, [passedProduct]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobileScreen(mediaQuery.matches);
    const handleResize = () => setIsMobileScreen(mediaQuery.matches);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("received product", product);
  useEffect(() => {
    if (product) {
      console.log("product in effeect", product);
      if (isPromotion && product.sizeName) {
        setAvailableSizes([product.sizeName]);
        setSelectedSize(product.sizeName);
      } else if (product.sizes) {
        const sizeNames = product.sizes.map((size) => size.name);
        console.log("sizeNames", sizeNames);
        setAvailableSizes(sizeNames);
      } else if (product?.productsizes) {
        const sizeArr = product?.productsizes[0];
        const sizeNames = sizeArr.sizes.map((size) => size.name);
        console.log("sizeNames", sizeNames);
        setAvailableSizes(sizeNames);
      } else {
        setAvailableSizes([]);
      }
    }
  }, [product, isPromotion]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const getDiscountPercent = () => {
    if (
      isPromotion &&
      product.originalPrice &&
      product.discountedPrice &&
      product.discountedPrice < product.originalPrice
    ) {
      const discount =
        ((product.originalPrice - product.discountedPrice) /
          product.originalPrice) *
        100;
      return Math.round(discount);
    }
    return 0;
  };

  const handleAddToCart = () => {
    const quantity = parseInt(quantityRef.current.value, 10) || 1;
    if (availableSizes.length > 0 && !selectedSize) {
      alert("Please select a size.");
      return;
    }

    const item = isPromotion
      ? {
          id: product.productId,
          name: product.productName,
          type: "promotion",
          promotionPrice: product.discountedPrice,
          promotionId: categoryData.promotionId,
          price:
            product.discountedPrice &&
            product.discountedPrice < product.originalPrice
              ? product.discountedPrice
              : product.originalPrice,
          originalPrice: product.originalPrice,
          currency: product.currencyCode,
          size: selectedSize || null,
          quantity: quantity,
          image: product.imageUrl,
        }
      : {
          id: product._id,
          name: product.name,
          price: product.price,
          currency: product.currencyCode,
          size: selectedSize || null,
          quantity: quantity,
          image: product.imageUrl,
        };

    console.log("Adding to cart:", item);
    addToCart(item);
    navigate("/my-cart");
  };

  const handleAddQuantity = () => {
    const quantity = parseInt(quantityRef.current.value, 10) + 1;
    quantityRef.current.value = quantity;
  };

  const handleDecQuantity = () => {
    const quantity = parseInt(quantityRef.current.value, 10) - 1;
    quantityRef.current.value = quantity;
  };

  return (
    <>
      <section className="w-full max-w-screen-xl mx-auto px-4 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="w-full flex justify-center">
            <img
              src={product?.imageUrl || "/images/placeholder.jpg"}
              alt={product?.name}
              className="w-[400px] h-auto object-contain"
            />
          </div>

          <div className="w-full">
            <h1 className="text-2xl font-semibold text-gray-900">
              {product?.name}
            </h1>
            <div className="mt-2">
              {product?.originalPrice && product?.discountedPrice ? (
                <>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-[#0287ca]">
                      {currencies[product.currencyCode]?.symbol}
                      {product.discountedPrice}
                    </span>
                    <span className="text-lg line-through text-gray-500">
                      {currencies[product.currencyCode]?.symbol}
                      {product.originalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    You save {currencies[product.currencyCode]?.symbol}
                    {(product.originalPrice - product.discountedPrice).toFixed(
                      2
                    )}{" "}
                    (
                    {Math.round(
                      ((product.originalPrice - product.discountedPrice) /
                        product.originalPrice) *
                        100
                    )}
                    % Off)
                  </p>
                </>
              ) : product?.price ? (
                <p className="text-2xl font-bold text-gray-800">
                  {currencies[product.currencyCode]?.symbol}
                  {product.price}
                </p>
              ) : (
                <p className="text-red-500 text-sm">Price not available</p>
              )}
            </div>

            <div className="flex items-center mt-3">
              <span
                className={`h-3 w-3 rounded-full font-bol  ${
                  product?.quantity > 0 ? "bg-green-700" : "bg-red-500"
                } mr-2`}
              />
              <span className="text-gray-700">
                {product?.quantity > 0
                  ? "In Stock - Ready to Ship"
                  : "Out of Stock"}
              </span>
            </div>

            <div className="mt-5 flex items-center border border-gray-300 rounded-md w-max">
              <button
                onClick={handleDecQuantity}
                className="px-4 py-2 text-gray-900 border-r border-gray-300"
              >
                -
              </button>
              <input
                type="number"
                ref={quantityRef}
                className="w-10 text-center outline-none border-0 bg-transparent"
                defaultValue={1}
              />
              <button
                onClick={handleAddQuantity}
                className="px-4 py-2 text-gray-900 border-l border-gray-300"
              >
                +
              </button>
            </div>
            {availableSizes.length > 0 && (
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Select Size:
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">-- Select Size --</option>
                  {availableSizes.map((size, idx) => (
                    <option key={idx} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#0287ca] text-white text-lg py-3 rounded-lg hover:bg-[#026aa4]"
              >
                Add to Cart
              </button>
              <button className="w-full bg-gray-100 text-lg py-3 rounded-lg border border-gray-300 hover:bg-gray-200">
                Buy Now
              </button>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-600 flex items-center">
                <Lock className="w-5 h-5 text-gray-600 mr-2" />
                100% Secure Checkout
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6 text-green-500" />
                  <span className="text-sm text-gray-600">Trusted Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BadgeCheck className="w-6 h-6 text-blue-500" />
                  <span className="text-sm text-gray-600">Verified Seller</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">🚚 Fast Delivery</p>
              <p className="text-sm text-red-600 mt-1">
                🔥 12 sold in the last 15 hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductView;
