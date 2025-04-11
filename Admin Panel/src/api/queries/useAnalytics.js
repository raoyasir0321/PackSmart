import { useQuery } from "@tanstack/react-query";
import {
  getSalesReport,
  getRevenueReport,
  getNetReport,
  getProductReport,
  getTransactionReport,
  getSectionReport,
  getCategoryReport,
} from "../services/analyticsService";

export const useGetSalesReport = () => {
  return useQuery({
    queryKey: ["salesReport"],
    queryFn: getSalesReport,
  });
};

export const useGetRevenueReport = () => {
  return useQuery({
    queryKey: ["revenueReport"],
    queryFn: getRevenueReport,
  });
};

export const useGetNetReport = () => {
  return useQuery({
    queryKey: ["netReport"],
    queryFn: getNetReport,
  });
};

export const useGetProductReport = () => {
  return useQuery({
    queryKey: ["productReport"],
    queryFn: getProductReport,
  });
};

export const useGetTransactionReport = () => {
  return useQuery({
    queryKey: ["transactionReport"],
    queryFn: getTransactionReport,
  });
};

export const useGetSectionReport = () => {
  return useQuery({
    queryKey: ["sectionReport"],
    queryFn: getSectionReport,
  });
};

export const useGetCategoryReport = () => {
  return useQuery({
    queryKey: ["categoryReport"],
    queryFn: getCategoryReport,
  });
};
