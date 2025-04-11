// import React, { useState, useEffect } from "react";
// import CustomSelectOption from "../../../components/SelectOption/CustomSelectOption";
// import currencies from "@/utils/currencies";
// import PriceFilter from "./PriceFilter";
// // import { categoryWithSections } from "src/api/services/categoryApi";
// import { useCategories } from "../../../api/hooks/useCategories";
// // import { useSections } from "src/api/hooks/useSection";
// // import { useGetSectionWithCategoryOnly } from "src/api/queries/useSection";

// function CategoriesFilters({
//   isRecommendedProducts = false,
//   category,
//   showSections = true,
//   onPriceRangeChange,
//   initialProducts,
//   sectionId,
//   fromSection
// }) {
//   const [selectedRanges, setSelectedRanges] = useState([]);
//   const [sectionWithCat, setSectionWithCat] = useState([]);

//   const initialPrices = [
//     ...new Set(initialProducts?.map((pro) => pro.price)),
//   ].sort((a, b) => a - b);

//   // if (!category || category === "undefined") {
//   //   // const {} = useSections();
//   //   const { data: sectionWithCategory } =
//   //     useGetSectionWithCategoryOnly(sectionId);
//   //   setSectionWithCat(sectionWithCategory);
//   //   console.log("sectionWithCategory", sectionWithCategory);
//   // }

//   if(!fromSection || fromSection === "undefined"){

//   }
//   console.log("initialProducts grid view ", category);
//   const priceOptions = initialPrices.map((prc, index, arr) => {
//     const nextPrice = arr[index + 1];

//     return {
//       label:
//         index === 0
//           ? `Under ${currencies["GBP"].symbol}  ${nextPrice}`
//           : nextPrice
//           ? `${currencies["GBP"].symbol} ${prc} - ${currencies["GBP"].symbol}  ${nextPrice}`
//           : `Over ${currencies["GBP"].symbol} ${prc}`,
//       range: {
//         min: index === 0 ? 0 : prc,
//         max: nextPrice ?? Infinity,
//       },
//     };
//   });

//   // console.log("initialPrices", priceOption);
//   // const priceOptions = [
//   //   { label: "Under $50", range: { min: 0, max: 50 } },
//   //   { label: "$50 - $100", range: { min: 50, max: 100 } },
//   //   { label: "$100 - $200", range: { min: 100, max: 200 } },
//   //   { label: "Over $200", range: { min: 200, max: Infinity } },
//   // ];

//   // const handleCheckboxChange = (range, checked) => {
//   //   let newSelectedRanges;
//   //   if (checked) {
//   //     newSelectedRanges = [...selectedRanges, range];
//   //   } else {
//   //     newSelectedRanges = selectedRanges.filter(
//   //       (r) => r.min !== range.min || r.max !== range.max
//   //     );
//   //   }
//   //   setSelectedRanges(newSelectedRanges);
//   // };

//   const handleCheckboxChange = (range, checked) => {
//     let newSelectedRanges;

//     if (checked) {
//       newSelectedRanges = [...selectedRanges, range];
//     } else {
//       newSelectedRanges = selectedRanges.filter(
//         (r) => r.min !== range.min || r.max !== range.max
//       );
//     }
//     setSelectedRanges(newSelectedRanges);
//   };

//   const handleSliderChange = (values) => {
//     const range = { min: values[0], max: values[1] };
//     setSelectedRanges([range]);
//     onPriceRangeChange([range]);
//   };

//   useEffect(() => {
//     onPriceRangeChange(selectedRanges);
//   }, [selectedRanges]);

//   // if( )

//   return (
//     <div className="col-xl-3 col-lg-3 col-md-4">
//       <div className="left mobile-sidebar sticky-md-top" id="sidebar">
//         <div className="category">
//           <div className="d-flex align-items-center justify-content-between d-md-none d-block mb-2">
//             <span className="d-md-none d-block mb-0">Filter Search:</span>
//             <label htmlFor="menu-toggle">
//               <img
//                 className="filter-close"
//                 src="assets/images/filter-close.png"
//                 alt="Close"
//               />
//             </label>
//           </div>
//           <hr className="d-md-none d-block mb-3" />
//           <span>
//             {isRecommendedProducts ? "Recommended-Products" : "Category"}
//           </span>
//           <div className="accordion" id="maincategory">
//             {Array.isArray(category) ? (
//               category.map((cat) => (
//                 <div key={cat._id} className="category-item mb-6">
//                   <p className="text-base font-semibold text-gray-700 mb-2">
//                     {cat.name}
//                   </p>
//                   {cat.sections && cat.sections.length > 0 ? (
//                     <div className="sections-list pl-4">
//                       {cat.sections.map((section) => (
//                         <p key={section._id} className="text-sm text-gray-600">
//                           {section.name}
//                         </p>
//                       ))}
//                     </div>
//                   ) : (
//                     showSections && (
//                       <p className="text-sm text-gray-500">
//                         No sections available
//                       </p>
//                     )
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p className="text-base font-semibold text-gray-700 mb-2">
//                 {category?.name}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Price Range Filter */}
//         <div className="">
//           {/* <span>Price Range</span>
//           {priceOptions?.map((option, index) => (
//             <div key={index} className="form-check">
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 id={`price-${index}`}
//                 onChange={(e) =>
//                   handleCheckboxChange(option.range, e.target.checked)
//                 }
//               />
//               <label className="form-check-label" htmlFor={`price-${index}`}>
//                 {option.label}
//               </label>
//             </div>
//           ))} */}

//           <PriceFilter
//             initialPrices={initialPrices}
//             handleFilter={handleSliderChange}
//           />
//         </div>

//         {/* Popular Brands  */}
//         {/* <div className="popular-brands">
//           <span>Popular Brands</span>
//           <div className="brands-inner">
//             <div className="left">
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id="Apple"
//                 />
//                 <label className="form-check-label" htmlFor="Apple">
//                   Apple
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div> */}

//         {/* <div className="popular-tags">
//           <span>Popular Tag</span>
//           <div className="tag">
//             <a href="#">Game</a>
//             <a href="#" className="active">
//               iPhone
//             </a>
//             <a href="#">TV</a>
//             <a href="#">Asus Laptops</a>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default CategoriesFilters;

import React, { useState, useEffect } from "react";
import PriceFilter from "./PriceFilter";
import { Link } from "react-router-dom";

function CategoriesFilters({
  isRecommendedProducts = false,
  category,
  showSections = true,
  onPriceRangeChange,
  initialProducts,
  sectionId,
  fromSection,
  sections,
  sectionName,
}) {
  console.log("sections", sections);

  //  price filer
  const [selectedRanges, setSelectedRanges] = useState([]);

  //  price filter
  const initialPrices = [
    ...new Set(initialProducts?.map((pro) => pro.price || pro.discountedPrice)),
  ].sort((a, b) => a - b);
  //  price filter
  const handleSliderChange = (values) => {
    const range = { min: values[0], max: values[1] };
    setSelectedRanges([range]);
    onPriceRangeChange([range]);
  };
  // price filter
  useEffect(() => {
    onPriceRangeChange(selectedRanges);
  }, [selectedRanges]);

  const defaultSectionData = {
    name: "Technology",
    sections: [
      "Laptops",
      "Smart Watches",
      "Television",
      "Gaming",
      "Audio Devices",
    ],
  };

  const extractedSectionNames = Array.isArray(sections)
    ? sections.map((sec) => sec?.name).filter(Boolean)
    : [];
  console.log("sectionName", sectionName);
  const uniqueSectionNames = [...new Set(extractedSectionNames)];

  return (
    <div className="col-xl-3 col-lg-3 col-md-4">
      <div className="left mobile-sidebar sticky-md-top" id="sidebar">
        <div className="category">
          <div className="d-flex align-items-center justify-content-between d-md-none d-block mb-2">
            <span className="d-md-none d-block mb-0">Filter Search:</span>
            <label htmlFor="menu-toggle">
              <img
                className="filter-close"
                src="assets/images/filter-close.png"
                alt="Close"
              />
            </label>
          </div>
          <hr className="d-md-none d-block mb-3" />
          <span>
            {isRecommendedProducts ? "Recommended-Products" : "Category"}
          </span>
          <div className="accordion" id="maincategory">
            {!fromSection || fromSection === "undefined" ? (
              <div className="category-item mb-6">
                <p className="text-base font-normal text-gray-500 mb-2">
                  {/* {hardcodedTechnology.name} */}
                </p>
                <div className="sections-list pl-4">
                  {uniqueSectionNames && uniqueSectionNames.length > 0 ? (
                    uniqueSectionNames?.map((section, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {section}
                      </p>
                    ))
                  ) : (
                    <p className="text-base font-bold  text-gray-900">
                      {sectionName}
                    </p>
                  )}
                </div>
              </div>
            ) : Array.isArray(category) ? (
              category.map((cat) => (
                <div key={cat._id} className="category-item mb-6">
                  <p className="text-base font-semibold text-gray-700 mb-2">
                    {cat.name}
                  </p>
                  {cat.sections && cat.sections.length > 0 ? (
                    <div className="sections-list pl-4">
                      {cat.sections.map((section) => (
                        // <p key={section._id} className="text-sm text-gray-600">
                        //   {section.name}
                        // </p>
                        <Link
                          key={section._id}
                          to={`/section-products/${section._id}`}
                          state={{
                            sectionId: section._id,
                            category: category,
                            fromSection: true,
                          }}
                          className="text-sm text-gray-500 hover:text-blue-500"
                        >
                          {section.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    showSections && (
                      <p className="text-sm text-gray-500">
                        No sections available
                      </p>
                    )
                  )}
                </div>
              ))
            ) : (
              <p className="text-base font-semibold text-gray-700 mb-2">
                {category?.name}
              </p>
            )}
          </div>
        </div>

        <div className="">
          <PriceFilter
            initialPrices={initialPrices}
            handleFilter={handleSliderChange}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoriesFilters;
