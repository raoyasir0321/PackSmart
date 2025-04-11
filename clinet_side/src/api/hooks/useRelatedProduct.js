import { useGetRelatedProducts } from "../queries/useRelatedProduct";

export const useRelatedProduct = () => {
  return {
    fetchRelatedProducts: (id) => useGetRelatedProducts(id),
  };
};
