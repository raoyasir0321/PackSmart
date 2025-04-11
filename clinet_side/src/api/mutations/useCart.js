import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../services/orderService";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["Order"]);
    },
  });
};
