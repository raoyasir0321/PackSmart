// import React, { useState } from "react";
// import { Spinner } from "react-bootstrap";
// import { useForm } from "react-hook-form";

// export default function Form({
//   categories = [],
//   sections = [],
//   handleCategorySelect,
//   handleForm,
//   isLoading,
// }) {
//   const { register, handleSubmit, watch, setValue } = useForm({
//     defaultValues: {
//       budget: "",
//       selectedCategories: [],
//       selectedSections: {},
//     },
//   });

//   const selectedCategories = watch("selectedCategories");
//   const selectedSections = watch("selectedSections");

//   const onSubmit = (data) => {
//     const { selectedSections, budget } = data;

//     const allSelectedSectionIds = Object.values(selectedSections).flat();

//     const submitData = {
//       sectionIds: allSelectedSectionIds,
//       maxBudget: parseInt(budget, 10),
//     };

//     console.log("On Submit Data: ", submitData);

//     handleForm(submitData);
//   };

//   const handleCategoryAdd = (categoryId) => {
//     if (!selectedCategories.includes(categoryId)) {
//       setValue("selectedCategories", [...selectedCategories, categoryId]);
//       handleCategorySelect(categoryId);
//     }
//   };

//   const handleCategoryRemove = (categoryId) => {
//     setValue(
//       "selectedCategories",
//       selectedCategories.filter((id) => id !== categoryId)
//     );

//     const updatedSections = { ...selectedSections };
//     delete updatedSections[categoryId];
//     setValue("selectedSections", updatedSections);
//   };

//   const handleSectionAdd = (categoryId, sectionId) => {
//     const updatedSections = { ...selectedSections };
//     if (!updatedSections[categoryId]) {
//       updatedSections[categoryId] = [];
//     }
//     if (!updatedSections[categoryId].includes(sectionId)) {
//       updatedSections[categoryId].push(sectionId);
//     }
//     setValue("selectedSections", updatedSections);
//   };

//   const handleSectionRemove = (categoryId, sectionId) => {
//     const updatedSections = { ...selectedSections };
//     updatedSections[categoryId] = updatedSections[categoryId].filter(
//       (id) => id !== sectionId
//     );
//     if (updatedSections[categoryId].length === 0) {
//       delete updatedSections[categoryId];
//     }
//     setValue("selectedSections", updatedSections);
//   };

//   console.log("sections", sections);
//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Shop By Budget</h1>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="space-y-6 bg-white p-6 shadow rounded"
//       >
//         <div>
//           <label className="block mb-1 font-semibold" htmlFor="budget">
//             Enter Your Budget (PKR):
//           </label>
//           <input
//             id="budget"
//             type="number"
//             placeholder="e.g. 40000"
//             className="border border-gray-300 rounded w-full p-2"
//             {...register("budget", { required: true })}
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-semibold">Select Categories:</label>
//           <select
//             onChange={(e) => handleCategoryAdd(e.target.value)}
//             className="border border-gray-300 rounded w-full p-2"
//           >
//             <option value="">Select a category</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           <div className="mt-2 flex flex-wrap gap-2">
//             {selectedCategories.map((categoryId) => {
//               const category = categories.find((cat) => cat._id === categoryId);
//               return (
//                 <span
//                   key={categoryId}
//                   className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
//                 >
//                   {category?.name}
//                   <button
//                     type="button"
//                     className="text-red-500 hover:text-red-700"
//                     onClick={() => handleCategoryRemove(categoryId)}
//                   >
//                     x
//                   </button>
//                 </span>
//               );
//             })}
//           </div>
//         </div>

//         {selectedCategories.map((categoryId) => {
//           const categorySections = sections?.filter(
//             (section) => section.categoryId === categoryId
//           );

//           return (
//             <div key={categoryId} className="mt-4">
//               <label className="block mb-2 font-semibold">
//                 Sections for{" "}
//                 {categories.find((cat) => cat._id === categoryId)?.name}:
//               </label>
//               <select
//                 onChange={(e) => handleSectionAdd(categoryId, e.target.value)}
//                 className="border border-gray-300 rounded w-full p-2"
//               >
//                 <option value="">Select a section</option>
//                 {categorySections.map((section) => (
//                   <option key={section._id} value={section._id}>
//                     {section.name}
//                   </option>
//                 ))}
//               </select>

//               <div className="mt-2 flex flex-wrap gap-2">
//                 {selectedSections[categoryId]?.map((sectionId) => {
//                   const section = categorySections.find(
//                     (sec) => sec._id === sectionId
//                   );
//                   return (
//                     <span
//                       key={sectionId}
//                       className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2"
//                     >
//                       {section?.name}
//                       <button
//                         type="button"
//                         className="text-red-500 hover:text-red-700"
//                         onClick={() =>
//                           handleSectionRemove(categoryId, sectionId)
//                         }
//                       >
//                         x
//                       </button>
//                     </span>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })}

//         <div>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
//           >
//             {isLoading ? <Spinner size="sm" /> : "Show Me Products"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React from "react";
import { Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function Form({
  categories = [],
  sections = [],
  handleCategorySelect,
  handleForm,
  isLoading,
}) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      budget: "",
      selectedCategories: [],
      selectedSections: {},
    },
  });

  const selectedCategories = watch("selectedCategories");
  const selectedSections = watch("selectedSections");

  const onSubmit = (data) => {
    const { selectedSections, budget } = data;

    const allSelectedSectionIds = Object.values(selectedSections).flat();

    const submitData = {
      sectionIds: allSelectedSectionIds,
      maxBudget: parseInt(budget, 10),
    };

    handleForm(submitData);
  };

  const handleCategoryAdd = (categoryId) => {
    if (!selectedCategories.includes(categoryId)) {
      setValue("selectedCategories", [...selectedCategories, categoryId]);
      handleCategorySelect(categoryId);
    }
  };

  const handleCategoryRemove = (categoryId) => {
    setValue(
      "selectedCategories",
      selectedCategories.filter((id) => id !== categoryId)
    );

    const updatedSections = { ...selectedSections };
    delete updatedSections[categoryId];
    setValue("selectedSections", updatedSections);
  };

  const handleSectionAdd = (categoryId, sectionId) => {
    const updatedSections = { ...selectedSections };
    if (!updatedSections[categoryId]) {
      updatedSections[categoryId] = [];
    }
    if (!updatedSections[categoryId].includes(sectionId)) {
      updatedSections[categoryId].push(sectionId);
    }
    setValue("selectedSections", updatedSections);
  };

  const handleSectionRemove = (categoryId, sectionId) => {
    const updatedSections = { ...selectedSections };
    updatedSections[categoryId] = updatedSections[categoryId].filter(
      (id) => id !== sectionId
    );
    if (updatedSections[categoryId].length === 0) {
      delete updatedSections[categoryId];
    }
    setValue("selectedSections", updatedSections);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white shadow-lg rounded-2xl p-8"
      >
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Enter Your Budget (PKR):
          </label>
          <input
            type="number"
            placeholder="e.g. 40000"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500"
            {...register("budget", { required: true })}
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Select Categories:
          </label>
          <select
            onChange={(e) => handleCategoryAdd(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="mt-3 flex flex-wrap gap-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find((cat) => cat._id === categoryId);
              return (
                <span
                  key={categoryId}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {category?.name}
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleCategoryRemove(categoryId)}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {selectedCategories.map((categoryId) => {
          const categorySections = sections.filter(
            (section) => section.categoryId === categoryId
          );

          return (
            <div key={categoryId}>
              <label className="block mb-2 font-semibold text-gray-700">
                Sections for{" "}
                {categories.find((cat) => cat._id === categoryId)?.name}:
              </label>
              <select
                onChange={(e) => handleSectionAdd(categoryId, e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                <option value="">Select a section</option>
                {categorySections.map((section) => (
                  <option key={section._id} value={section._id}>
                    {section.name}
                  </option>
                ))}
              </select>

              <div className="mt-3 flex flex-wrap gap-2">
                {selectedSections[categoryId]?.map((sectionId) => {
                  const section = categorySections.find(
                    (sec) => sec._id === sectionId
                  );
                  return (
                    <span
                      key={sectionId}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {section?.name}
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() =>
                          handleSectionRemove(categoryId, sectionId)
                        }
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}

        <button
          type="submit"
          className="w-full bg-[#0287ca] hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors"
        >
          {isLoading ? <Spinner size="sm" /> : "Show Me Products"}
        </button>
      </form>
    </motion.div>
  );
}
