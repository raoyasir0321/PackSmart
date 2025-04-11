import {
  useCreatePromotion,
  useDeletePromo,
} from "@/api/mutations/usePromotionMutation";
import { useGetPromotions } from "../queries/usePromotions";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/network/axiosInstance";
import { ENDPOINTS } from "@/network/endpoint";

export const getSinglePromotion = async (id) => {
  console.log("trigger single promo", id);
  const response = await axiosInstance.get(ENDPOINTS.SINGLE_PROMOTION(id));
  console.log("single Promo", response.data.data);
  const promotion = Array.isArray(response.data.data)
    ? response.data.data[0]
    : response.data.data;
  return promotion;
};

export const usePromotion = () => {
  return {
    cratePromotion: useCreatePromotion(),
    getPromotions: useGetPromotions(),
    deleteProm: useDeletePromo(),
    singelPromo: (id) =>
      useQuery({
        queryKey: ["promotion", id],
        queryFn: () => getSinglePromotion(id),
        enabled: !!id,
      }),
  };
};
