import React, { useState } from "react";
import { useRecommendation } from "../../../../src/api/hooks/useRecommendation";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { getProductSizes } from "../../../../src/api/services/productService";
import { useQueries } from "@tanstack/react-query";
import { getSectionById } from "../../../../src/api/services/sectionApi";

const Recommendations = () => {
  const { getRecommendations } = useRecommendation();
  const { data: recommendations, isLoading: isGetting } = getRecommendations;
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const sectionIDs = Array.isArray(recommendations?.data?.recommendation)
    ? recommendations.data.recommendation.map((rec) => rec.sectionId)
    : [];

  const sectionQueries = useQueries({
    queries: sectionIDs.map((id) => ({
      queryKey: ["section", id],
      queryFn: () => getSectionById(id),
      enabled: !!id,
    })),
  });

  const isLoading = sectionQueries?.some((query) => query.isLoading);
  const sections = sectionQueries?.map((query) => query.data?.data.section);
  console.log("sections", sections);

  const fetchAndNavigate = async () => {
    if (
      recommendations &&
      recommendations.data &&
      Array.isArray(recommendations.data.recommendation)
    ) {
      try {
        const productsWithSizes = await Promise.all(
          recommendations.data.recommendation.map(async (rec) => {
            let sizes = [];
            try {
              const productSize = await getProductSizes(rec.productId);
              sizes = productSize.map((pro) => pro.sizes).flat() || [];
            } catch (error) {
              console.error(
                "Error fetching sizes for product",
                rec.productId,
                error
              );
            }
            return {
              _id: rec.productId,
              name: rec.productName,
              description: rec.description,
              price: rec.price,
              sectionId: rec.sectionId,
              imageUrl: rec.imageUrl,
              quantity: rec.quantity,
              currencyCode: rec.currencyCode,
              sizes: sizes,
              scale: rec.scale,
            };
          })
        );
        setRecommendedProducts(productsWithSizes);
        const stateData = {
          sections: sections,
          category: productsWithSizes[0]?.name || "",
          products: productsWithSizes,
          selectedCategories: [],
          showSections: false,
          isRecommendedProducts: true,
        };
        navigate("/products", { state: stateData });
      } catch (error) {
        console.error("Error in fetchAndNavigate:", error);
      }
    }
  };

  if (isGetting) {
    return <Spinner />;
  }

  if (
    recommendations &&
    !location.state?.isRecommendedProducts &&
    location.pathname !== "/products" &&
    recommendedProducts.length === 0
  ) {
    setTimeout(() => {
      fetchAndNavigate();
    }, 0);
    return <Spinner />;
  }

  return null;
};

export default Recommendations;
