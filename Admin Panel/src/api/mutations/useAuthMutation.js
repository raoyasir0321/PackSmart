import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupUser, loginUser, logoutUser } from "@/api/services/authService";

export const useSignUpUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};
