import axiosInstance from "@/network/interceptor";
import { ENDPOINTS } from "../../network/endpoint";

export const signupUser = async (userData) => {
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
  const { admin } = response.data.data;
  localStorage.setItem("tokenAdmin", admin);
  return response.data;
};

export const logoutUser = async () => {
  const response = localStorage.removeItem("token");
  response ? true : false;
};
