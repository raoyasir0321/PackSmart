import {
  useCreateRecommendation,
  useDeleteRecommendation,
  useUpdateRecommendation,
} from "../mutations/useRecommend";
import { useGetRecommendations } from "../queries/useRecommend";

export const useRecommendation = () => {
  return {
    createRecommendation: useCreateRecommendation(),
    getRecommendations: useGetRecommendations(),
    deleteRecommendation: useDeleteRecommendation(),
    updateRecommendation: useUpdateRecommendation(),
  };
};
