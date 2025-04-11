import { useQuery } from "@tanstack/react-query";
import {
  addProducts,
  fetchProducts,
  getNewArrivalProducts,
  getProductSizes,
  productById,
  searchProduct,
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
    queryKey: ["productSizes", productId],
    queryFn: () => getProductSizes(productId),
    enabled: !!productId,
  });
};

export const useGetNewArrivalProducts = () => {
  return useQuery({
    queryKey: ["arrivalProducts"],
    queryFn: getNewArrivalProducts,
    // enabled: !!productId,
  });
};

export const useSearchProduct = (searchTerm) => {
  return useQuery({
    queryKey: ["searchProduct", searchTerm],
    queryFn: () => searchProduct(searchTerm),
    enabled: !!searchTerm,
  });
};
