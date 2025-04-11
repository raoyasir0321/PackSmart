import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../../api/hooks/useCategories";

function BottomHeader() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = React.useRef(null);

  const { fetchAllCategoriesWithSections } = useCategories();
  const { data: categories, isLoading } = fetchAllCategoriesWithSections || {};

  const handleShowCategory = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <section className="py-3 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-blue-600 font-bold flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-50 transition"
              onClick={handleShowCategory}
            >
              All Categories <i className="fa fa-angle-down" />
            </button>

            {showDropdown && (
              <ul
                className="fixed mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-xl z-[9999] max-h-80 overflow-y-auto"
                style={{
                  top:
                    dropdownRef.current?.getBoundingClientRect().bottom +
                    window.scrollY,
                  left:
                    dropdownRef.current?.getBoundingClientRect().left +
                    window.scrollX,
                }}
              >
                {isLoading ? (
                  <li className="px-4 py-2 text-gray-500">Loading...</li>
                ) : (
                  categories?.map((cat) => (
                    <li key={cat._id}>
                      <Link
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
                        to={`/section/${cat._id}`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/about-us"
              className="text-gray-800 font-medium hover:text-blue-600 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              About Us
            </Link>

            <Link
              to="/custom-budget"
              className="relative text-white font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Shop By Budget
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-ping"></span>
            </Link>

            <Link
              to="/recommendations"
              className="relative text-white font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Our Recommendations
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full animate-ping"></span>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <i className="fa fa-phone text-blue-600"></i>
          <a
            href="tel:+1234567890"
            className="text-gray-800 font-semibold focus:ring-2 focus:ring-blue-400"
          >
            +123 456 7890
          </a>
        </div>

        <button className="md:hidden px-3 py-2 text-gray-800 border rounded-md focus:ring-2 focus:ring-blue-400">
          <i className="fa fa-bars"></i>
        </button>
      </div>
    </section>
  );
}

export default BottomHeader;
