import axiosInstance from "@/network/interceptor";
import { ENDPOINTS } from "../../network/endpoint";
import axios from "axios";

export const fetchProducts = async () => {
  const response = await axiosInstance.get(ENDPOINTS.GET_ALL_PRODUCTS);
  console.log(response.data.data);
  const { products } = response.data.data;
  console.log(products);
  return products;
};

export const addProducts = async (data) => {
  const response = await axiosInstance.post(ENDPOINTS.ADD_PRODUCTS, data);
  console.log(response.data.data);
  const { product } = response.data.data;
  console.log(product);
  return product;
};

export const uploadImage = async (file) => {
  console.log(file);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const uploadEndpoint = `${baseURL}/upload-image`;

  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(uploadEndpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data.data.url);
    return response.data.data.url;
  } catch (error) {
    console.error("Image Upload Error:", error.response?.data || error.message);
    throw error;
  }
};

export const productById = async (id) => {
  const response = await axiosInstance.get(ENDPOINTS.GET_SINGLE_PRODUCT(id));
  console.log("Product details", response.data.data);

  const { product } = response.data.data;

  return Array.isArray(product) ? product[0] : product;
};

export const updateProduct = async (id, data) => {
  console.log(id, data);
  const response = await axiosInstance.patch(
    ENDPOINTS.UPDATE_PRODUCT(id),
    data
  );
  console.log(response.data.data);
  const { product } = response.data.data;
  return product;
};

export const deleteProduct = async (id) => {
  console.log(id);
  const response = await axiosInstance.delete(ENDPOINTS.DELETE_PRODUCT(id));
  return response.data;
};

export const getProductSizes = async (id) => {
  const response = await axiosInstance.get(ENDPOINTS.GET_PRODUCT_SIZE(id));
  console.log("Sizes", response.data.data);
  return response.data.data;
};

export const getNewArrivalProducts = async () => {
  const response = await axiosInstance.get(ENDPOINTS.GET_NEW_ARRIVALS);
  console.log("new arrivals", response.data.data.products);
  const { products } = response.data.data;
  return products;
};

export const searchProduct = async (searchTerm) => {
  const response = await axiosInstance.get(ENDPOINTS.SEARCH(searchTerm));
  console.log("found products", response.data.data);
  const products = response.data.data;
  return products;
};
