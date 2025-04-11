import axiosInstance from "../../network/interceptor";
import { ENDPOINTS } from "../../network/endpoint";

export const fetchCategories = async () => {
  console.log("start fetching");
  const response = await axiosInstance.get(ENDPOINTS.CATEGORY);

  const { categories } = response.data.data;
  console.log(categories);
  return categories;
};

export const allCategoriesWithSections = async () => {
  console.log("start fetching allCategoriesWithSections ");
  const response = await axiosInstance.get(ENDPOINTS.CATEGORIES_AND_SECTIONS);
  console.log("all cate wit sections", response.data.data);
  const { categories } = response.data.data;
  console.log("categories with section in service", categories);
  return categories;
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
  return { sections, category };
};
