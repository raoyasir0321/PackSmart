import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWish } from "../services/wishListService";

export const useGetWishList = () => {
  return useQuery({
    queryKey: ["wishListProducts"],
    queryFn: getWish,
  });
};
