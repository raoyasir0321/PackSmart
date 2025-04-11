import axios from "axios";

// const baseURL = import.meta.env.VITE_API_BASE_URL;
const local = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: `${local}/api/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
