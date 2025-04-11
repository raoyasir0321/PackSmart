import {
  useGetAllCategories,
  useGetAllSections,
  useGetSectionById,
  // useGetSectionCategories,
  useGetSectionWithCategory,
  useGetSectionProducts,
} from "../queries/useSection";
import {
  useAddSection,
  useDeleteSection,
  useSectionMutations,
  useUpdateSection,
} from "@/api/mutations/useSectionMutations";
// import { useDeleteCategoryMutation } from "@/api/mutations/useDeleteCategoryMutation";

export const useSections = () => {
  return {
    fetchSections: useGetAllSections(),
    fetchSectionById: useGetSectionById,
    fetchSectionProducts: useGetSectionProducts,
    // fetchSectionCategories: useGetSectionCategories,
    // fetchAllCategories: useGetAllCategories(),
    fetchSectionsWithCategory: useGetSectionWithCategory(),
    addSection: useAddSection(),
    updateSection: useUpdateSection(),
    deleteSection: useDeleteSection(),
    // fetchSectionWithCategory: useGetSectionWithCategoryOnly,
  };
};
