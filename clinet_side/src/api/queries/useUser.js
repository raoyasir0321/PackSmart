import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../services/authService";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};
