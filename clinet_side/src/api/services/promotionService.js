import axiosInstance from "../../network/interceptor";
import { ENDPOINTS } from "../../network/endpoint";
export const getPromotions = async () => {
  console.log("trigger");
  const response = await axiosInstance.get(ENDPOINTS.GET_PROMOTION);
  console.log("promotions", response.data.data);
  const promotions = response.data.data;
  console.log("promotions", promotions);
  return promotions;
};

// useGetSinglePromotion

export const getSinglePromotion = async (id) => {
  console.log("trigger single promo", id);
  const response = await axiosInstance.get(ENDPOINTS.SINGLE_PROMOTION(id));
  console.log("single Promo", response.data.data);

  const promotion = Array.isArray(response.data.data)
    ? response.data.data[0]
    : response.data.data;
  return promotion;
};
