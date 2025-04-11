import axiosInstance from "../../network/interceptor";
import { ENDPOINTS } from "../../network/endpoint";

export const getRecommendations = async () => {
  const response = await axiosInstance.get(ENDPOINTS.GET_RECOMMENDATION);
  console.log("get All recom", response.data.data);
  return response.data;
};
