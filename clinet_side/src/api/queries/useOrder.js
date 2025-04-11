import { useQuery } from "@tanstack/react-query";
import { myOrders, orderNumbers, singleOrder } from "../services/orderService";

export const useMyOrdersQuery = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: myOrders,
  });
};

export const useSingleOrder = (orderId) => {
  return useQuery({
    queryKey: ["orders`", orderId],
    queryFn: () => singleOrder(orderId),
    enabled: !!orderId,
  });
};

export const useOrderNumbers = () => {
  return useQuery({
    queryKey: ["orderNumbers"],
    queryFn: orderNumbers,
  });
};
