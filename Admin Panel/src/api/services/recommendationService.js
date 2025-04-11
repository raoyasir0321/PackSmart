import axiosInstance from "@/network/interceptor";
import { ENDPOINTS } from "@/network/endpoint";

export const createRecom = async (data) => {
  console.log("creating recom", data);
  const response = await axiosInstance.post(
    ENDPOINTS.CREATE_RECOMMENDATION,
    data
  );
  console.log("recom created", response.data.data);
  return response.data;
};

export const getRecommendations = async () => {
  const response = await axiosInstance.get(ENDPOINTS.GET_RECOMMENDATION);
  console.log("get All recom", response.data.data);
  return response.data;
};

export const deleteRecom = async (Id) => {
  const response = await axiosInstance.delete(
    ENDPOINTS.DELETE_RECOMMENDATION(Id)
  );
  console.log("delete  recom", response.data.data);
  return response.data;
};

export const updateRecommendation = async (Id, data) => {
  console.log("updating recom", data);
  const response = await axiosInstance.patch(
    ENDPOINTS.UPDATE_RECOMMENDATION(Id),
    data
  );
  console.log("update recom", response.data.data);
  return response.data;
};
