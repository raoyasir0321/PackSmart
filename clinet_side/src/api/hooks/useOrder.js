import { useQueryClient } from "@tanstack/react-query";
import { useCreateOrder } from "../mutations/useCart.js";
import { useMyOrdersQuery, useSingleOrder } from "../queries/useOrder.js";
import { singleOrder } from "../services/orderService.js";
import { productById, updateProduct } from "../services/productService";
// import { useDeleteCategoryMutation } from "@/api/mutations/useDeleteCategoryMutation";

export const useOrder = () => {
  const queryClient = useQueryClient();
  return {
    createOrder: useCreateOrder(),
    myOrders: useMyOrdersQuery(),
    singleOrder: async (orderId) => {
      const orderData = await queryClient.fetchQuery({
        queryKey: ["orders", orderId],
        queryFn: () => singleOrder(orderId),
      });
      return orderData;
    },
  };
};
