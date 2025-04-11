import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRecom,
  deleteRecom,
  updateRecommendation,
} from "../services/recommendationService";

export const useCreateRecommendation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createRecom(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["recommendations"]);
    },
  });
};

export const useDeleteRecommendation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteRecom(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["recommendations"]);
    },
  });
};

export const useUpdateRecommendation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateRecommendation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["recommendations"]);
    },
  });
};
