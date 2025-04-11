import { useQuery } from "@tanstack/react-query";
import {
  getAllOrders,
  singleOrder,
  updateOrderStatus,
} from "../services/orderService";

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
};

export const useGetSingleOrder = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => singleOrder(orderId),
    enabled: !!orderId,
  });
};
