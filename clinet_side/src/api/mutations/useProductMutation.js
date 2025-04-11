import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addProducts,
  updateProduct,
  deleteProduct,
} from "../services/productService";

export const useAddProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProducts,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useUpdateProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};
