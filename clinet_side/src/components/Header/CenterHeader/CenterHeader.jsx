import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/smartLogo.png";
import { ShoppingCart, Heart, User, Search } from "lucide-react"; // Lucide icons for cleaner look
import { useCart } from "../../../Context/CartContext";
import useDebounce from "../../../api/hooks/useDebounce";
import { useSearchProduct } from "../../../../src/api/queries/useProducts";
import { useGetWishList } from "../../../api/queries/useWishList";

function CenterHeader() {
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const { data: wishList } = useGetWishList();
  const wishListCount = wishList?.length || 0;

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: searchResults, isLoading: isSearchLoading } =
    useSearchProduct(debouncedSearchTerm);

  return (
    <section className="center-header bg-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <div className="transition-transform duration-200 hover:scale-75">
              <img
                src={logo}
                alt="logo"
                className="h-52 w-auto object-contain"
              />
            </div>
          </Link>

          <form
            className="flex-grow mx-10 max-w-3xl relative"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative">
              <input
                type="text"
                className="w-full py-3 pl-5 pr-32 text-gray-700 bg-gray-100 rounded-full shadow-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-300"
                placeholder="Search product, brand or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-500"
              >
                <Search size={20} />
              </button>
            </div>

            {debouncedSearchTerm && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {isSearchLoading ? (
                  <p className="p-3 text-gray-600">Loading...</p>
                ) : searchResults && searchResults.length > 0 ? (
                  <ul className="list-none p-3">
                    {searchResults.map((product) => (
                      <li
                        key={product._id}
                        className="py-2 px-4 text-gray-700 hover:bg-blue-100 rounded-md transition"
                      >
                        <Link to={`/product/${product._id}`}>
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-3 text-gray-600">No results found.</p>
                )}
              </div>
            )}
          </form>

          <div className="flex items-center space-x-6">
            <Link
              to="/wishlist"
              className="relative hover:scale-110 transition"
            >
              <Heart size={28} className="text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {wishListCount}
              </span>
            </Link>

            <Link
              to="/my-cart"
              className="relative hover:scale-110 transition"
              id="global-cart-icon"
            >
              <ShoppingCart size={28} className="text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {cartCount}
              </span>
            </Link>
            <Link to="/my-account" className="hover:scale-110 transition">
              <User size={28} className="text-gray-700" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CenterHeader;
