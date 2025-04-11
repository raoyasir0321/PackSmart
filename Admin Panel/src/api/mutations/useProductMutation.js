import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addProducts,
  updateProduct,
  deleteProduct,
  productSizeCreate,
  updateProductSize,
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

export const useProductSizeCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productSizeCreate,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useUpdateProductSize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateProductSize(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};
