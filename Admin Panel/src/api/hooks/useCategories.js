import {
  useCategoriesQuery,
  useCategorySectionsQuery,
} from "@/api/queries/useCategory";
import {
  useAddCategoryMutation,
  useDeleteCategory,
} from "@/api/mutations/userAddCategoryMutation";
// import { useDeleteCategoryMutation } from "@/api/mutations/useDeleteCategoryMutation";

export const useCategories = () => {
  return {
    fetchCategories: useCategoriesQuery(),
    fetchCategorySections: (categoryId) => useCategorySectionsQuery(categoryId),
    addCategory: useAddCategoryMutation(),
    deleteCategory: useDeleteCategory(),
  };
};
