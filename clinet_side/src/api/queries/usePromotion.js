import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPromotions,
  getSinglePromotion,
} from "../services/promotionService";

export const useGetPromotions = () => {
  return useQuery({
    queryKey: ["promotions"],
    queryFn: getPromotions,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

// export const useGetSingelPromotion = (id) => {
//   return useQuery({
//     queryKey: ["promotionDetailss", id],
//     queryFn: () => getSinglePromotion(id),
//     enabled: !!id,
//   });
// };
