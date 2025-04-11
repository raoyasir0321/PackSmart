import axiosInstance from "@/network/axiosInstance";
import { ENDPOINTS } from "@/network/endpoint";

export const createPromotion = async (data) => {
  console.log("sending promotion", data);
  const RefinedPrices = data.prices.filter(
    (price) =>
      price.productId !== "" &&
      price.originalPrice !== "" &&
      price.discountPrice !== "" &&
      price.OriginalPrice !== ""
  );

  const decoratedData = {
    ...data,
    prices: RefinedPrices,
  };
  console.log("decorated data", decoratedData);
  const response = await axiosInstance.post(
    ENDPOINTS.CREATE_PROMOTION,
    decoratedData
  );
  console.log(response.data.data);
  const { promotion } = response.data.data;
  console.log("promotion", promotion);
  return promotion;
};

export const getPromotions = async () => {
  console.log("trigger");
  const response = await axiosInstance.get(ENDPOINTS.GET_PROMOTION);
  console.log("promotions", response.data.data);
  const promotions = response.data.data;
  console.log("promotions", promotions);
  return promotions;
};

export const deletePromotion = async (id) => {
  const response = await axiosInstance.delete(ENDPOINTS.DELETE_PROMOTION(id));
  console.log("deleted", response.data);
  return response.data;
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
