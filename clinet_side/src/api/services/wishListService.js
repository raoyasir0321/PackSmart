import axiosInstance from "../../network/axiosInstance";
import { ENDPOINTS } from "../../network/endpoint";

export const createWish = async (data) => {
  const response = await axiosInstance.post(ENDPOINTS.SAVE_WISH, data);
  console.log("wish product", response.data.data);
  return response.data.data;
};

export const getWish = async () => {
  const response = await axiosInstance.get(ENDPOINTS.GET_WISH);
  console.log("wish product", response.data.data);
  return response.data.data;
};
