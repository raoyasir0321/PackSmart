import { useQuery } from "@tanstack/react-query";
import { fetchCategories, categoryWithSections } from "../services/categoryApi";

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};

export const useCategorySectionsQuery = (categoryId) => {
  console.log("receive id", categoryId);
  return useQuery({
    queryKey: ["sections", categoryId],
    queryFn: () => categoryWithSections(categoryId),
    enabled: !!categoryId,
  });
};
