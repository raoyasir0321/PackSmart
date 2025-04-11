import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRelatedProduct } from "../../../api/hooks/useRelatedProduct";
import Spinner from "@/components/Spinner";
import { useCart } from "../../../Context/CartContext";
import toast from "react-hot-toast";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import currencies from "@/utils/currencies";

const RelatedProducts = ({ sectionId }) => {
  const { fetchRelatedProducts } = useRelatedProduct();
  const { data: relatedProducts, isPending } = fetchRelatedProducts(sectionId);
  const products = relatedProducts?.section?.products;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const item = {
      id: product.productId || product._id,
      name: product.productName || product.name,
      price: product.discountedPrice ? product.discountedPrice : product.price,
      originalPrice: product.originalPrice,
      currency: product.currencyCode,
      quantity: 1,
      image: product.imageUrl,
    };
    addToCart(item);
    toast.success("Product successfully added to cart!");
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div className="text-center p-6">No related products found.</div>;
  }

  return (
    <section className="related-products py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h3 className="text-3xl font-semibold text-gray-900 border-b-2  pb-2">
            Related Products
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.productId || product._id}
              className="bg-white shadow-md rounded-2xl p-4 transition-all hover:shadow-lg"
            >
              <Link
                to={`/product/${product.productId || product._id}`}
                state={{ sectionId, promoProduct: product }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.productName || product.name}
                  className="w-full h-48 object-contain rounded-xl bg-white"
                />
              </Link>

              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-yellow-500 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa ${
                          i < (product.rating || 0) ? "fa-star" : "fa-star-o"
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 ml-1">{product.rating}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    >
                      <ShoppingCart className="w-5 h-5 text-gray-700" />
                    </button>
                    <Link
                      to="#"
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    >
                      <Heart className="w-5 h-5 text-gray-700" />
                    </Link>
                    <Link
                      to={`/product/${product.productId || product._id}`}
                      state={{ sectionId }}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    >
                      <Eye className="w-5 h-5 text-gray-700" />
                    </Link>
                  </div>
                </div>

                <h4 className="text-lg font-extrabold text-gray-800 mt-2">
                  {product.productName || product.name}
                </h4>

                <h2 className="text-md font-light text-gray-800 mt-2">
                  {product.description}
                </h2>

                <div className="mt-2 text-lg font-bold text-gray-900">
                  {currencies["GBP"].symbol}
                  {product.discountedPrice
                    ? product.discountedPrice
                    : product.price}{" "}
                  {product.discountedPrice && (
                    <del className="text-red-500 ml-2 text-sm">
                      ${product.originalPrice}
                    </del>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
