import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCreateWish } from "../../api/mutations/useCreateWish";
import { useGetWishList } from "../../api/queries/useWishList";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import toast from "react-hot-toast";
import FlyToCartAnimation from "../../components/FlyToCart";
import { useCart } from "../../Context/CartContext";

function ProductCard({ product, sectionId }) {
  const [isWished, setIsWished] = useState(false);
  const [showFlyAnim, setShowFlyAnim] = useState(false);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
  const [endCoords, setEndCoords] = useState({ x: 0, y: 0 });

  const imageRef = useRef(null);
  const cartIconRef = useRef(null);

  const createWish = useCreateWish();
  const { data: wishList } = useGetWishList();
  const { addToCart } = useCart();

  useEffect(() => {
    if (wishList && wishList.length > 0) {
      const productId = product._id || product.productId;
      const alreadyWished = wishList.some((wishItem) =>
        wishItem.product.some((p) => p._id === productId)
      );
      if (alreadyWished) {
        setIsWished(true);
      }
    }
  }, [wishList, product]);

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    const productId = product._id || product.productId;
    const isExist = wishList.some((wishItem) =>
      wishItem.product.some((p) => p._id === product._id)
    );
    const payload = isExist
      ? { remove: [productId] }
      : { productId: [productId] };

    createWish.mutate(payload, {
      onSuccess: (res) => {
        if (res.productId?.includes(productId)) {
          toast.success("Product added to wishlist");
        } else {
          toast.error("Product removed from wishlist");
          setIsWished(false);
        }
      },
      onError: () => toast.error("Failed to update wishlist"),
    });
  };

  const handleAddToCart = () => {
    const item = {
      id: product._id,
      name: product.name,
      price: product.discountedPrice || product.price,
      image: product.imageUrl,
      quantity: 1,
      currency: product.currencyCode,
    };

    const imgRect = imageRef.current.getBoundingClientRect();
    const cartRect = document
      .querySelector("#global-cart-icon")
      ?.getBoundingClientRect();

    if (cartRect) {
      setStartCoords({ x: imgRect.left, y: imgRect.top });
      setEndCoords({ x: cartRect.left, y: cartRect.top });
      setShowFlyAnim(true);
    }

    addToCart(item);
  };
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-6 relative">
      {showFlyAnim && (
        <FlyToCartAnimation
          image={product.imageUrl}
          start={startCoords}
          end={endCoords}
          onComplete={() => {
            setShowFlyAnim(false);
            // toast.success("Added to cart!");
          }}
        />
      )}

      <div className="bg-white rounded-lg shadow-md border p-4 hover:shadow-lg transition duration-300">
        <div className="relative">
          <button
            onClick={(e) => handleAddToWishlist(e, product)}
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
          >
            <Heart
              className={`w-4 h-4 ${
                isWished ? "text-red-500" : "text-gray-600"
              }`}
            />
          </button>

          <div className="flex items-center justify-center h-[250px] overflow-hidden rounded-md">
            <Link
              to={`/product/${product._id || product.productId}`}
              state={{ promoProduct: product, sectionId }}
              className="block w-full h-full"
            >
              <img
                ref={imageRef}
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-gray-800 font-medium text-sm truncate">
            {product.name}
          </h3>
          <p className="text-[#0287ca] uppercase text-xs font-medium">
            {/* {product.brand || "No Brand"} */}
          </p>

          <div className="flex items-end justify-between mt-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-[#0287ca] text-xl font-semibold">
                £{product.discountedPrice || product.price}
              </span>
              {product.originalPrice && product.discountedPrice && (
                <span className="text-gray-400 text-sm line-through">
                  £{product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                className="w-10 h-10 rounded-full bg-[#0287ca] flex items-center justify-center shadow text-white hover:bg-blue-700 transition"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>

              <Link
                to={`/product/${product._id || product.productId}`}
                state={{ promoProduct: product, sectionId }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow hover:bg-gray-200 transition"
              >
                <Eye className="w-5 h-5 text-gray-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
