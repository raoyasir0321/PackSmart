import axiosInstance from "@/network/axiosInstance";
import { ENDPOINTS } from "@/network/endpoint";

export const getAllOrders = async () => {
  const response = await axiosInstance.get(ENDPOINTS.ALL_ORDERS);
  console.log("my Orders", response.data.data);
  const { order } = response.data.data;
  console.log("order res ", order);
  return order;
};

export const updateOrderStatus = async (id, newStatus) => {
  const response = await axiosInstance.patch(
    ENDPOINTS.UPDATE_ORDER_STATUS(id, newStatus)
  );
  console.log("updated Order", response.data.data);
  const { order } = response.data.data;
  console.log("order res updated", order);
  return order;
};

export const singleOrder = async (id) => {
  const response = await axiosInstance.get(ENDPOINTS.SINGLE_ORDER(id));
  console.log("Single Order", response.data.data);
  const { order } = response.data.data;
  console.log("order res updated", order);
  return order;
};
