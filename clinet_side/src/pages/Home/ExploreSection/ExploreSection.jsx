import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCategories } from "../../../api/hooks/useCategories";
import e1 from "../../../assets/images/e-1.png";
import e2 from "../../../assets/images/e-2.png";
import e3 from "../../../assets/images/e-3.png";
import e4 from "../../../assets/images/e-4.png";

const ExploreSection = () => {
  const { fetchAllCategoriesWithSections } = useCategories();
  const { data: categoriesWithSections } = fetchAllCategoriesWithSections;
  console.log("categoriesWithSections", categoriesWithSections);

  const desiredCategories = ["men's", "women's", "kids", "shoes"];

  const filteredCategories = categoriesWithSections
    ? categoriesWithSections.filter((cat) =>
        desiredCategories.includes(cat.name.toLowerCase())
      )
    : [];

  const fallbackImages = [e1, e2, e3, e4];

  const overlappingImages = {
    "men's": ["/images/men1.jpg", "/images/men2.webp", "/images/men3.webp"],
    "women's": [
      "/images/women1.webp",
      "/images/women2.jpeg",
      "/images/women3.webp",
    ],
    kids: ["/images/kids1.webp", "/images/kids2.webp", "/images/kids3.webp"],
    shoes: ["/images/shoe1.jpeg", "/images/shoe2.jpeg", "/images/shoe3.jpeg"],
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl  font-extrabold text-gray-800 ">
          Clothing &amp; Shoes For Everyone
        </h2>

        <hr className="mb-8 border-gray-300" />

        <div className="grid   gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredCategories.map((category, index) => {
            const overlap =
              overlappingImages[category.name.toLowerCase()] || [];
            return (
              <Link
                key={category._id}
                to={`/section/${category._id}`}
                state={{ category }}
                className="block"
              >
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transition transform hover:scale-105 hover:rotate-1">
                  <div className="relative h-56">
                    <img
                      src={
                        category.imageUrl ||
                        fallbackImages[index] ||
                        fallbackImages[0]
                      }
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                  </div>
                  <div className="p-4 flex flex-col items-start">
                    <h3 className="text-xl font-bold text-gray-800">
                      {category.name}
                    </h3>
                    <div className="mt-2 flex items-center text-blue-600 hover:text-blue-800">
                      Explore
                      <ArrowRight className="ml-1" size={16} />
                    </div>
                    <div className="mt-4 flex -space-x-2">
                      {overlap.map((imgUrl, idx) => (
                        <img
                          key={idx}
                          src={imgUrl}
                          alt={`${category.name} thumb ${idx + 1}`}
                          className="w-10 h-10 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
