import React, { useState, useEffect } from "react";
import { useCategories } from "../../../api/hooks/useCategories";
import { useSections } from "../../../api/hooks/useSection";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function TechnologySection() {
  const { fetchSectionProducts } = useSections();
  const { data: categoriesWithSections, isLoading: isLoadingCategories } =
    useCategories().fetchAllCategoriesWithSections;

  if (isLoadingCategories) {
    return <p className="text-center text-gray-600">Loading categories...</p>;
  }

  const technologyCategory = categoriesWithSections?.find(
    (category) => category.name === "Technology"
  );

  if (!technologyCategory) {
    return (
      <p className="text-center text-red-500">No Technology category found</p>
    );
  }

  const largeSections = technologyCategory.sections.slice(0, 2);
  const smallSections = technologyCategory.sections.slice(2, 6);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
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
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-left"
          >
            <h2 className="text-3xl font-bold tracking-wide text-gray-800 border-b-2 border-gray-200 pb-2">
              {technologyCategory.name}
            </h2>
            <p className="mt-2 text-md text-gray-600">
              Explore the latest in technology trends.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {largeSections.map((section) => (
              <SectionCard
                key={section._id}
                section={section}
                fetchSectionProducts={fetchSectionProducts}
                variant="large"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {smallSections.map((section) => (
              <SectionCard
                key={section._id}
                section={section}
                fetchSectionProducts={fetchSectionProducts}
                variant="small"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionCard({ section, fetchSectionProducts, variant }) {
  const { data: products } = fetchSectionProducts(section._id);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (products && products.length > 0) {
      setImageUrl(products[0]?.imageUrl);
    }
  }, [products]);

  const cardHeight = variant === "large" ? "h-64" : "h-48";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to="/products"
        state={{
          sectionId: section._id,
          products,
          sectionName: section.name,
          // fromSection: true,
        }}
        className={`group relative rounded-xl overflow-hidden cursor-pointer ${cardHeight} block
          shadow-lg border border-gray-200 transition-transform duration-500 hover:scale-105 hover:shadow-2xl`}
      >
        {imageUrl ? (
          <motion.div
            className="absolute inset-0 bg-no-repeat bg-contain bg-center transition-transform
                 duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
            whileHover={{ y: -10 }}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-300" />
        )}

        <div
          className="absolute inset-0 bg-black opacity-40
               transition-opacity duration-500 group-hover:opacity-30"
        />

        <motion.div
          className="relative flex flex-col justify-center items-center h-full p-4"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">
            {section.name}
          </h3>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-blue-500 opacity-0 transition-opacity duration-700 group-hover:opacity-10 blur-lg"
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </Link>
    </motion.div>
  );
}

export default TechnologySection;
