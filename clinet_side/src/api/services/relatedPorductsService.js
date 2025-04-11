import axiosInstance from "../../network/interceptor";
import { ENDPOINTS } from "../../network/endpoint";

export const getRelatedProducts = async (id) => {
  console.log("trigger");
  const response = await axiosInstance.get(ENDPOINTS.GET_RELATED_PRODUCTS(id));
  console.log("related pro", response.data.data);
  const relatedPro = response.data.data;
  console.log("related Pro", relatedPro);
  return relatedPro;
};
