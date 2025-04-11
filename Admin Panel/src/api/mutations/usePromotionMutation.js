import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPromotion, deletePromotion } from "../services/promotionService";

export const useCreatePromotion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }) => createPromotion(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["promotions"]);
    },
  });
};

export const useDeletePromo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePromotion(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["promotions"]);
    },
  });
};
