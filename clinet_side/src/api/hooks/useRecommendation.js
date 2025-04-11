import { useGetRecommendations } from "../queries/useRecommend";

export const useRecommendation = () => {
  return {
    // createRecommendation: useCreateRecommendation(),
    getRecommendations: useGetRecommendations(),
  };
};
