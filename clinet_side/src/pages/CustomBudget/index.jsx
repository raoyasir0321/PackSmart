// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useCategories } from "../../api/hooks/useCategories";
// import { getSuggestedProducts } from "../../api/hooks/useSuggestedProducts";
// import { useCategoryContext } from "../../Context/CategoryContext";
// import Form from "@/components/DynamicForm";
// import VerticalPromotions from "../../components/Banner/VerticalPromotion";

// const CustomBudget = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { categoryData, setCategoryData } = useCategoryContext();

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [categorySections, setCategorySections] = useState([]);

//   const { fetchCategories, fetchCategorySections } = useCategories();
//   const { data: categories = [], isPending: isLoadingCat } = fetchCategories;
//   const { data: sections = [], isPending: isLoadingSec } =
//     fetchCategorySections(selectedCategory);

//   const { suggestedProducts } = getSuggestedProducts();
//   const {
//     data: suggestedData,
//     isPending: isLoadingProducts,
//     mutateAsync: fetchSuggestedProducts,
//   } = suggestedProducts;

//   useEffect(() => {
//     if (location.state) {
//       setCategoryData(location.state);
//     }
//   }, [location.state, setCategoryData]);

//   useEffect(() => {
//     if (sections?.sections) {
//       setCategorySections((prev) => [...prev, ...sections.sections]);
//     }
//   }, [sections]);

//   useEffect(() => {
//     if (selectedCategory && categories.length > 0) {
//       const matchingCats = categories.filter(
//         (cat) => cat._id === selectedCategory
//       );
//       setSelectedCategories((prev) => [...prev, ...matchingCats]);
//     }
//   }, [selectedCategory, categories]);

//   const handleCategorySelect = (categoryId) => {
//     setSelectedCategory(categoryId);
//   };

//   const handleSubmit = async (data) => {
//     console.log("Data to mutation", data);
//     const result = await fetchSuggestedProducts(data);
//     console.log("result", result);

//     const products = result?.productsSelected;
//     if (products && products.length > 0) {
//       navigate("/products", {
//         state: { products, selectedCategories, showSections: false },
//       });
//     } else {
//       console.error("No products found!");
//     }
//   };

//   return (
//     <div className="flex w-full min-h-screen">
//       <div className="w-1/6 hidden lg:block h-screen">
//         <VerticalPromotions />
//       </div>

//       <div className="flex-1 p-4">
//         <div className="container mx-auto min-h-screen">
//           <Form
//             categories={categories}
//             handleCategorySelect={handleCategorySelect}
//             sections={categorySections}
//             handleForm={handleSubmit}
//             isLoading={isLoadingProducts}
//           />
//         </div>
//       </div>

//       <div className="w-1/6 hidden lg:block h-screen">
//         <VerticalPromotions />
//       </div>
//     </div>
//   );
// };

// export default CustomBudget;

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCategories } from "../../api/hooks/useCategories";
import { getSuggestedProducts } from "../../api/hooks/useSuggestedProducts";
import { useCategoryContext } from "../../Context/CategoryContext";
import Form from "@/components/DynamicForm";
import VerticalPromotions from "../../components/Banner/VerticalPromotion";
import { motion } from "framer-motion";

const CustomBudget = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryData, setCategoryData } = useCategoryContext();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categorySections, setCategorySections] = useState([]);

  const { fetchCategories, fetchCategorySections } = useCategories();
  const { data: categories = [], isPending: isLoadingCat } = fetchCategories;
  const { data: sections = [], isPending: isLoadingSec } =
    fetchCategorySections(selectedCategory);

  const { suggestedProducts } = getSuggestedProducts();
  const {
    data: suggestedData,
    isPending: isLoadingProducts,
    mutateAsync: fetchSuggestedProducts,
  } = suggestedProducts;

  useEffect(() => {
    if (location.state) {
      setCategoryData(location.state);
    }
  }, [location.state, setCategoryData]);

  useEffect(() => {
    if (sections?.sections) {
      setCategorySections((prev) => [...prev, ...sections.sections]);
    }
  }, [sections]);

  useEffect(() => {
    if (selectedCategory && categories.length > 0) {
      const matchingCats = categories.filter(
        (cat) => cat._id === selectedCategory
      );
      setSelectedCategories((prev) => [...prev, ...matchingCats]);
    }
  }, [selectedCategory, categories]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSubmit = async (data) => {
    const result = await fetchSuggestedProducts(data);

    const products = result?.productsSelected;
    if (products && products.length > 0) {
      navigate("/products", {
        state: { products, selectedCategories, showSections: false },
      });
    } else {
      console.error("No products found!");
    }
  };

  return (
    <div
      className="flex w-full  bg-gradient-to-r from-[#0287ca]"
      style={{ height: "100vh" }}
    >
      {/* <div className="w-1/6 hidden lg:block">
        <VerticalPromotions />
      </div> */}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 p-4 container mx-auto flex items-center justify-center"
      >
        <div className="  rounded-3xl  w-full max-w-3xl transform ">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Customize Your Budget
          </h2>

          <Form
            categories={categories}
            handleCategorySelect={handleCategorySelect}
            sections={categorySections}
            handleForm={handleSubmit}
            isLoading={isLoadingProducts}
          />
        </div>
      </motion.div>

      <div className="w-1/6 hidden lg:block">
        <VerticalPromotions />
      </div>
    </div>
  );
};

export default CustomBudget;
