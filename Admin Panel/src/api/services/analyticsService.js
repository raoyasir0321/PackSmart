import axiosInstance from "@/network/axiosInstance";
import { ENDPOINTS } from "@/network/endpoint";

export const getSalesReport = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.GET_SALES_REPORT);
    console.log("Sales Report:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching sales report:", error);
    throw error;
  }
};

export const getRevenueReport = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.GET_REVENUE_REPORT);
    console.log("Revenue Report:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching revenue report:", error);
    throw error;
  }
};

export const getNetReport = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.GET_NET_REPORT);
    console.log("Net Report:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching net report:", error);
    throw error;
  }
};

export const getProductReport = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.GET_PRODUCT_REPORT);
    console.log("Product Report:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product report:", error);
    throw error;
  }
};

export const getTransactionReport = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.GET_TRANSACTION_REPORT);
    console.log("Transaction Report:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching transaction report:", error);
    throw error;
  }
};

export const getSectionReport = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.GET_SECTION_REPORT);
    console.log("Section Report:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching section report:", error);
    throw error;
  }
};

export const getCategoryReport = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.GET_CATEGORY_REPORT);
    console.log("Category Report:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching category report:", error);
    throw error;
  }
};
