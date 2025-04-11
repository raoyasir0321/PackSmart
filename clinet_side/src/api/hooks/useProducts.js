import {
  useGetNewArrivalProducts,
  useGetProductById,
  useGetProducts,
  useGetProductSizes,
} from "../queries/useProducts.js";
import {
  useAddProducts,
  useDeleteProduct,
  useUpdateProducts,
} from "@/api/mutations/useProductMutation";
import { productById, updateProduct } from "../services/productService";
// import { useDeleteCategoryMutation } from "@/api/mutations/useDeleteCategoryMutation";

export const useProducts = () => {
  return {
    fetchProducts: useGetProducts(),
    addProducts: useAddProducts(),
    singelProduct: useGetProductById,
    updateProduct: useUpdateProducts(),
    deleteProduct: useDeleteProduct(),
    getProductSizes: (productId) => useGetProductSizes(productId),
    getNewArrivalProducts: useGetNewArrivalProducts(),
  };
};
