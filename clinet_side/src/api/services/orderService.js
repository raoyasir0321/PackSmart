import axiosInstance from "../../network/axiosInstance";
import { ENDPOINTS } from "../../network/endpoint";

export const createOrder = async (orderItem) => {
  console.log("updated order", orderItem);
  const response = await axiosInstance.post(ENDPOINTS.CREATE_ORDER, orderItem);
  console.log("order creation response", response.data.data);

  const { order } = response.data.data;
  console.log("order res ", order);

  return order;
};

export const myOrders = async () => {
  const response = await axiosInstance.get(ENDPOINTS.My_ORDERS);
  console.log("my Orders", response.data.data);

  const { order } = response.data.data;
  console.log("order res ", order);

  return order;
};

export const singleOrder = async (id) => {
  const response = await axiosInstance.get(ENDPOINTS.SINGLE_ORDER(id));
  console.log("single Order", response.data.data);

  const { order } = response.data.data;
  console.log("single order res  ", order);

  return order;
};

export const orderNumbers = async () => {
  console.log("Trigger ORder numbers");
  const response = await axiosInstance.get(ENDPOINTS.ORDER_NUMBERS);
  console.log("order Numbers", response.data.data);

  const { order } = response.data.data;

  console.log("single order res  ", order);

  return order;
};
