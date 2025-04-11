import { useQuery } from "@tanstack/react-query";
import {
  addProducts,
  fetchProducts,
  getProductSizes,
  productById,
  updateProductSize,
} from "../services/productService";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const useGetProductById = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => productById(productId),
    enabled: !!productId,
  });
};

export const useGetProductSizes = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductSizes(productId),
    enabled: !!productId,
  });
};
