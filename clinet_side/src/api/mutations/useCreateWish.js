import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWish } from "../services/wishListService";

export const useCreateWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const currentWish = queryClient.getQueryData(["wishListProducts"]) || [];
      const currentIds = currentWish.map((item) => item.productId);

      let updatedIds = [...currentIds];
      console.log("updatedIds", updatedIds);

      const idsToAdd = payload.add || payload.productId || [];
      if (idsToAdd.length > 0) {
        updatedIds = Array.from(new Set([...updatedIds, ...idsToAdd]));
      }

      if (payload.remove) {
        updatedIds = updatedIds.filter((id) => !payload.remove.includes(id));
      }

      return await createWish({ productId: updatedIds });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishListProducts"]);
    },
  });
};
