import {
  useAllCategoryWithSectionsQuery,
  useCategoriesQuery,
  useCategorySectionsQuery,
} from "../queries/useCategory";
// import {
//   useAddCategoryMutation,
//   useDeleteCategory,
// } from "../mutations/userAddCategoryMutation";
// import { useDeleteCategoryMutation } from "@/api/mutations/useDeleteCategoryMutation";

export const useCategories = () => {
  return {
    fetchCategories: useCategoriesQuery(),
    fetchCategorySections: (categoryId) => useCategorySectionsQuery(categoryId),
    fetchAllCategoriesWithSections: useAllCategoryWithSectionsQuery(),
    // addCategory: useAddCategoryMutation(),
    // deleteCategory: useDeleteCategory(),
  };
};
