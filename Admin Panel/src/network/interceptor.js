import axiosInstance from "@/network/axiosInstance";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request Interceptor Triggered");
    const token = localStorage.getItem("tokenAdmin");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Headers after Interceptor:", config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized! Redirecting to login.");
      history.push("/");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
