import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPromotions,
  getSinglePromotion,
} from "../services/promotionService";

export const useGetPromotions = () => {
  return useQuery({
    queryKey: ["promotions"],
    queryFn: getPromotions,
  });
};

// export const useGetSingelPromotion = (id) => {
//   return useQuery({
//     queryKey: ["promotionDetailss", id],
//     queryFn: () => getSinglePromotion(id),
//     enabled: !!id,
//   });
// };
