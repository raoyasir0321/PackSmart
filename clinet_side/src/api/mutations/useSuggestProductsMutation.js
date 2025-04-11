import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSuggestedProducts } from "../services/suggestProducts";

export const useGetAllSuggestedProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getSuggestedProducts,
    onSuccess: () => {
      queryClient.invalidateQueries(["suggestedProducts"]);
    },
  });
};
