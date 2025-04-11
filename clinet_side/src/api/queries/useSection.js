import { useQuery } from "@tanstack/react-query";
import {
  getSectionById,
  getAllSections,
  getSectionProducts,
  getAllSectionWithCategory,
  getSectionCategory,
  // getAllCategories,
} from "../services/sectionApi";

export const useGetAllSections = () => {
  return useQuery({
    queryKey: ["sections"],
    queryFn: getAllSections,
    retry: false,
  });
};

export const useGetSectionById = (id) => {
  return useQuery({
    queryKey: ["section", id],
    queryFn: () => getSectionById(id),
    enabled: false,
  });
};

export const useGetSectionProducts = (id) => {
  return useQuery({
    queryKey: ["sectionProducts", id],
    queryFn: () => getSectionProducts(id),
    enabled: !!id,
    retry: false,
  });
};

export const useGetSectionWithCategory = () => {
  return useQuery({
    queryKey: ["sectionWithCategories"],
    queryFn: getAllSectionWithCategory,
    // enabled: !!id,
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};

export const useGetSectionWithCategoryOnly = (id) => {
  return useQuery({
    queryKey: ["sectionWithCategories"],
    queryFn: () => getSectionCategory(id),
    // enabled: !!id,
  });
};
