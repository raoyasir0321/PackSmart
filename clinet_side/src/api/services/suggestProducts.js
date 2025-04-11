import axiosInstance from "../../network/axiosInstance";
import { ENDPOINTS } from "../../network/endpoint";

export const getSuggestedProducts = async (data) => {
  const response = await axiosInstance.post(
    ENDPOINTS.GET_SUGGESTED_PRODUCTS,
    data
  );
  console.log("Suggested products", response.data.data);
  return response.data.data;
};
