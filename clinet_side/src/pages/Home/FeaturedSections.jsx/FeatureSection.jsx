import React from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../../api/hooks/useCategories";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/components/ui/carousel";

function FeatureSection() {
  const { fetchCategories } = useCategories();
  const { data: categories, isPending } = fetchCategories;

  if (isPending) {
    return <p>Loading categories...</p>;
  }

  return (
    <section className="featured-sec py-12">
      <div className="container relative">
        <div className="border-line">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-800">
              Featured Categories
            </h1>
          </div>

          <div className="relative">
            <Carousel
              opts={{ align: "start" }}
              className="w-full max-w-full relative"
            >
              <CarouselContent>
                {categories?.map((category) => (
                  <CarouselItem
                    key={category._id}
                    className="md:basis-1/4 lg:basis-1/6 text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 cursor-pointer"
                    >
                      <Link to={`/section/${category._id}`} className="block">
                        <motion.img
                          src={category.imageUrl || "default-image.png"}
                          alt={category.name}
                          className="w-40 h-32 mx-auto object-cover rounded-full border border-gray-200 shadow-lg"
                          whileHover={{
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
                          }}
                        />
                        <span className="block mt-3 text-lg font-medium text-gray-800 transition-colors hover:text-blue-600">
                          {category.name}
                        </span>
                      </Link>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </CarouselPrevious>
              <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </CarouselNext>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
