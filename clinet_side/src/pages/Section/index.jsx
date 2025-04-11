import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCategories } from "../../api/hooks/useCategories";
import { motion } from "framer-motion";
import VerticalPromotions from "../../components/Banner/VerticalPromotion";

function SectionsPage() {
  const { id: categoryId } = useParams();
  const navigate = useNavigate();
  const { fetchCategorySections } = useCategories();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: categoryAndSections,
    isLoading: isLoadingSections,
    isError,
  } = fetchCategorySections(categoryId);

  const { sections = [], category } = categoryAndSections || {};

  // animations

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoadingSections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-600">Loading sections...</p>
      </div>
    );
  }

  if (isError || !categoryAndSections) {
    return (
      <div className="flex w-full min-h-screen">
        {/* <div className="w-1/5 hidden lg:block h-screen">
          <VerticalPromotions />
        </div> */}

        <div className="flex-1 p-4 flex items-center justify-center">
          <p className="text-red-600">
            Failed to load sections. Please try again later.
          </p>
        </div>

        <div className="w-1/5 hidden lg:block h-screen">
          <VerticalPromotions />
        </div>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-600">
          No sections available for this category.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex w-full min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex-1 p-4">
        <motion.h1
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Sections
        </motion.h1>

        <div className="flex flex-wrap gap-4 justify-center lg:justify-start ml-4">
          {sections.map((section, index) => (
            <motion.button
              key={section._id}
              variants={buttonVariants}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full 
                         hover:bg-blue-500 hover:text-white transform transition-transform 
                         duration-300 ease-in-out hover:scale-105 shadow-md"
              onClick={() =>
                navigate(`/section-products/${section._id}`, {
                  state: {
                    category,
                    sectionId: section._id,
                    fromSection: true,
                  },
                })
              }
            >
              {section.name || "Unnamed Section"}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="w-1/6 hidden lg:block h-screen">
        <VerticalPromotions />
      </div>
    </motion.div>
  );
}

export default SectionsPage;
