import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateOrderStatus } from "@/api/services/orderService";

export const useUpdateOrderStatus = (orderId, newStatus) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, newStatus }) =>
      updateOrderStatus(orderId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
    // mutationFn: ({ id, data }) => updateProductSize(id, data),
  });
};
