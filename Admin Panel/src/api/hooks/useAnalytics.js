import {
  useGetSalesReport,
  useGetRevenueReport,
  useGetNetReport,
  useGetProductReport,
  useGetTransactionReport,
  useGetSectionReport,
  useGetCategoryReport,
} from "@/api/queries/useAnalyticsQueries";

export const useAnalytics = () => {
  return {
    salesReport: useGetSalesReport(),
    revenueReport: useGetRevenueReport(),
    netReport: useGetNetReport(),
    productReport: useGetProductReport(),
    transactionReport: useGetTransactionReport(),
    sectionReport: useGetSectionReport(),
    categoryReport: useGetCategoryReport(),
  };
};
