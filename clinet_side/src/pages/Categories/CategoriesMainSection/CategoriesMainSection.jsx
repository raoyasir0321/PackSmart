import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CategoriesFilters from "../CategoriesFilters/CategoriesFilters";
import CategoriesProducts from "../CategoriesProducts/CategoriesProducts";
import { useSections } from "../../../api/hooks/useSection";
import { useCategoryContext } from "../../../Context/CategoryContext";
import VerticalPromotions from "../../../components/Banner/VerticalPromotion";
import Spinner from "@/components/Spinner";

const CategoriesMainSection = () => {
  const { categoryData, setCategoryData } = useCategoryContext();
  const location = useLocation();
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  useEffect(() => {
    if (location.state) {
      setCategoryData(location.state);
    }
  }, [location.state, setCategoryData]);
  const { fromSection, sections, sectionName } = location.state;
  console.log("mainsection", location.state);
  console.log("sectionsMainSecton", sections);

  const {
    sectionId,
    category,
    products: initialProducts,
    selectedCategories,
    showSections,
    isRecommendedProducts,
  } = categoryData || {};

  const { fetchSectionProducts } = useSections();
  const { data: fetchedProducts, isLoading: isLoadingSectionProducts } =
    fetchSectionProducts(sectionId);

  const finalProducts = fetchedProducts || initialProducts;

  const filteredProducts = finalProducts?.filter((product) => {
    if (selectedPriceRanges.length === 0) return true;
    return selectedPriceRanges.some(
      (range) =>
        (product.price || product.discountedPrice) >= range.min &&
        (product.price || product.discountedPrice) <= range.max
    );
  });

  const handlePriceRangeChange = (ranges) => {
    console.log("Updated Price Range in Parent:", ranges);
    setSelectedPriceRanges(ranges);
  };
  return (
    <section className="product-sec m-0 p-0" style={{ overflow: "hidden" }}>
      <div className="container-fluid m-0 p-0" style={{ height: "100vh" }}>
        <div className="row g-0 h-100">
          {/* <div
            className="col-lg-2 d-none d-lg-block p-0"
            style={{ height: "100%", overflow: "hidden" }}
          >
            <VerticalPromotions />
          </div> */}

          <div
            className="col-lg-10 p-4"
            style={{ height: "100%", overflow: "auto" }}
          >
            <div className="row">
              <CategoriesFilters
                sections={sections && sections.length ? sections : ""}
                sectionName={sectionName}
                isRecommendedProducts={!!isRecommendedProducts}
                showSections={showSections}
                initialProducts={fetchedProducts || initialProducts}
                category={selectedCategories || category}
                onPriceRangeChange={handlePriceRangeChange}
                sectionId={sectionId}
                fromSection={fromSection}
              />

              {sectionId ? (
                isLoadingSectionProducts ? (
                  <div className="flex items-center justify-center ">
                    <Spinner />
                  </div>
                ) : (
                  <CategoriesProducts
                    sectionId={sectionId}
                    products={filteredProducts}
                  />
                )
              ) : (
                <CategoriesProducts products={filteredProducts} />
              )}
            </div>
          </div>

          <div
            className="col-lg-2 d-none d-lg-block p-0"
            style={{ height: "100%", overflow: "hidden" }}
          >
            <VerticalPromotions />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesMainSection;
