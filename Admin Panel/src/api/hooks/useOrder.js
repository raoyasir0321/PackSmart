import { useUpdateOrderStatus } from "../mutations/useOrderMutation";
import { useGetAllOrders, useGetSingleOrder } from "../queries/useOrder";

export const useOrder = () => {
  return {
    fetchOrders: useGetAllOrders(),
    updateOrderStatus: useUpdateOrderStatus(),
    singleOrder: useGetSingleOrder,
  };
};
