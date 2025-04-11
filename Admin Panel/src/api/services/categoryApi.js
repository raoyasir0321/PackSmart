import axiosInstance from "@/network/interceptor";
import { ENDPOINTS } from "@/network/endpoint";

export const fetchCategories = async () => {
  const response = await axiosInstance.get(ENDPOINTS.CATEGORY);

  const { categories } = response.data.data;
  console.log(categories);
  return categories;
};

export const addCategory = async (data) => {
  const response = await axiosInstance.post(ENDPOINTS.ADD_CATEGORY, data);
  return response.data;
};

export const categoryWithSections = async (categoryId) => {
  console.log("selected category to fetch", categoryId);
  const response = await axiosInstance.get(
    ENDPOINTS.CATEGORY_SECTIONS(categoryId)
  );
  console.log(response.data.data);
  const { category } = response.data.data;
  const sections = category.flatMap((cat) => cat.sections || []);
  console.log("Sections", sections);
  return sections;
};

export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(ENDPOINTS.DELETE_CATEGORY(id));
  return response.data;
};
