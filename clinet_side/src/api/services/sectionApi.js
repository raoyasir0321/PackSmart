import axiosInstance from "../../network/interceptor";
import { ENDPOINTS } from "../../network/endpoint";

export const addSection = async (data) => {
  const response = await axiosInstance.post(ENDPOINTS.ADD_SECTION, data);
  return response.data;
};

export const getSectionById = async (id) => {
  const response = await axiosInstance.get(ENDPOINTS.GET_SECTION_BY_ID(id));
  console.log("sectionResponse", response);
  return response.data;
};

// export const getSectionWithCategory = async (id) => {
//   const response = await axiosInstance.get(ENDPOINTS.GET_SECTION_BY_ID(id));
//   return response.data;
// };

export const getAllSections = async () => {
  const response = await axiosInstance.get(ENDPOINTS.GET_ALL_SECTIONS);
  const { section } = response.data.data;
  return section;
};

export const updateSection = async (id, data) => {
  console.log(data);
  const response = await axiosInstance.patch(
    ENDPOINTS.UPDATE_SECTION(id),
    data
  );
  return response.data;
};

export const deleteSection = async (id) => {
  const response = await axiosInstance.delete(ENDPOINTS.DELETE_SECTION(id));
  return response.data;
};

export const getSectionProducts = async (id) => {
  console.log("sectionId get", id);
  const response = await axiosInstance.get(ENDPOINTS.GET_SECTION_PRODUCTS(id));
  const { section } = response.data.data;
  console.log("products", section);

  const products = Array.isArray(section)
    ? section.flatMap((sec) => sec.products || [])
    : section?.products ?? [];

  return products;
};

export const getAllSectionWithCategory = async () => {
  console.log("trigger fetching sections with category");
  const response = await axiosInstance.get(
    ENDPOINTS.GET_ALL_SECTIONS_WITH_CATEGORIES
  );
  const { section } = response.data.data;
  return section;
};

export const getSectionCategory = async (id) => {
  console.log("trigger fetching sections with category");
  const response = await axiosInstance.get(
    ENDPOINTS.GET_SECTION_CATEGORIES(id)
  );
  const { section } = response.data.data;
  console.log("getSectionCategory", section);
  return section;
};

// export const getAllCategories = async () => {
//   const response = await axiosInstance.get(ENDPOINTS.GET_ALL_CATEGORIES);
//   return response.data;
// };
