import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGetWishList } from "../../api/queries/useWishList";
import useAddToCart from "../../api/hooks/useAddToCart";
import { useCreateWish } from "../../api/mutations/useCreateWish";

function Wishlist() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    AOS.init({ duration: 1000, once: true });
  }, []);

  const { data: wishList, isLoading, isError } = useGetWishList();
  const handleAddToCart = useAddToCart();
  const createWish = useCreateWish();

  if (isLoading) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-lg font-semibold"
      >
        Loading wishlist...
      </motion.p>
    );
  }

  if (isError) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-red-500 text-lg font-semibold"
      >
        Failed to load wishlist. Please try again later.
      </motion.p>
    );
  }

  if (!wishList || wishList.length === 0) {
    return (
      <section className="wishlist-page flex justify-center items-center h-[50vh]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Wishlist</h1>
          <p className="text-lg text-gray-500 mt-2">
            Your wishlist is currently empty.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="wishlist-page bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
          className="wishlist-sec"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
              <Heart size={32} className="text-red-500" /> My Wishlist
            </h1>
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-700 mt-1 block"
            >
              &larr; Back to all wishlists
            </Link>
          </motion.div>

          <div className="hidden lg:grid grid-cols-[0.1fr_2fr_1fr_1fr_1fr] text-lg font-semibold text-gray-700 border-b pb-2">
            <span></span>
            <span>Product</span>
            <span className="text-center">Price</span>
            <span className="text-center">Stock Status</span>
            <span className="text-center">Actions</span>
          </div>

          <AnimatePresence>
            {wishList.map((wishItem) => {
              const p = wishItem.product?.[0];
              if (!p) return null;

              const inStock = p.quantity > 0;
              const handleRemove = () => {
                createWish.mutate({ remove: [wishItem.productId] });
              };

              return (
                <motion.div
                  key={wishItem._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  data-aos="fade-up"
                  className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center py-4 border-b"
                >
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleRemove}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-md shadow-sm hover:scale-105 transition"
                    />
                    <div>
                      <p className="text-lg text-gray-700 font-medium">
                        {p.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Category: {p.category || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="text-gray-700 font-medium text-lg text-center">
                    {p.price ? `£${p.price}` : "N/A"}
                  </div>

                  <motion.div
                    animate={{ scale: inStock ? [1, 1.1, 1] : 1 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className={`font-semibold text-center ${
                      inStock ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {inStock ? "In Stock" : "Out of Stock"}
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center px-6 py-2 rounded-md text-white font-semibold transition ${
                      inStock
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!inStock}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(p);
                    }}
                  >
                    <ShoppingCart size={20} className="mr-2" /> Add To Cart
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-4">
              <select className="border rounded-md p-2 text-gray-700 bg-white">
                <option value="add-to-cart">Add to Cart</option>
                <option value="remove">Remove Selected</option>
              </select>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-100 transition">
                Apply
              </button>
            </div>
            <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
              Update
            </button>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}

export default Wishlist;
