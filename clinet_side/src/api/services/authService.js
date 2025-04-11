import axiosInstance from "@/network/interceptor";
import { ENDPOINTS } from "../../network/endpoint";

export const signupUser = async (userData) => {
  console.log("signupUser", userData);
  const response = await axiosInstance.post(ENDPOINTS.SIGNUP, userData);
  const { user } = response.data.data;
  localStorage.setItem("token", user.access_token);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

export const loginUser = async (userData) => {
  console.log("userData", userData);
  const response = await axiosInstance.post(ENDPOINTS.LOGIN, userData);
  console.log("logged in", response.data.data);
  const { user } = response.data.data;
  localStorage.setItem("token", user);
  return response.data;
};

export const logoutUser = async () => {
  const response = localStorage.removeItem("token");
  response ? true : false;
};

export const getUser = async () => {
  const response = await axiosInstance.get(ENDPOINTS.GET_USER);
  console.log("user", response.data.data);
  return response.data.data;
};

export const updateUser = async (userData) => {
  const response = await axiosInstance.patch(ENDPOINTS.GET_USER, userData);
  console.log("user", response.data.data);
  return response.data.data;
};

export const updatePassword = async (data) => {
  const response = await axiosInstance.patch(ENDPOINTS.UPDATE_PASSWORD, data);
  console.log("update password", response.data.data);
  return response.data.data;
};
