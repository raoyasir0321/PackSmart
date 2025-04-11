import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRelatedProducts } from "../services/relatedPorductsService";

export const useGetRelatedProducts = (id) => {
  return useQuery({
    queryKey: ["relatedProducts", id],
    queryFn: () => getRelatedProducts(id),
  });
};
