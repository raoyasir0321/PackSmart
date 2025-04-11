import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecommendations } from "../services/recommendationService";

export const useGetRecommendations = () => {
  return useQuery({
    queryKey: ["Recommendations"],
    queryFn: getRecommendations,
  });
};

// export const useGetSingelPromotion = (id) => {
//   return useQuery({
//     queryKey: ["promotionDetailss", id],
//     queryFn: () => getSinglePromotion(id),
//     enabled: !!id,
//   });
// };
