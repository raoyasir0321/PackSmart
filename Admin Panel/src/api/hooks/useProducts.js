import {
  useGetProductById,
  useGetProducts,
  useGetProductSizes,
} from "@/api/queries/useProducts";
import {
  useAddProducts,
  useDeleteProduct,
  useProductSizeCreate,
  useUpdateProducts,
  useUpdateProductSize,
} from "@/api/mutations/useProductMutation";
import {
  productById,
  updateProduct,
  updateProductSize,
} from "../services/productService";
// import { useDeleteCategoryMutation } from "@/api/mutations/useDeleteCategoryMutation";

export const useProducts = () => {
  return {
    fetchProducts: useGetProducts(),
    addProducts: useAddProducts(),
    singelProduct: useGetProductById,
    updateProduct: useUpdateProducts(),
    deleteProduct: useDeleteProduct(),
    productSizeCreate: useProductSizeCreate(),
    getProductSizes: (productId) => useGetProductSizes(productId),
    updateProductSize: useUpdateProductSize(),
  };
};
