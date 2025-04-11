import {
  useSignUpUser,
  useLoginUser,
  useLogoutUser,
} from "@/api/mutations/useAuthMutation";
// import { useDeleteCategoryMutation } from "@/api/mutations/useDeleteCategoryMutation";

export const useAuth = () => {
  return {
    signUp: useSignUpUser(),
    login: useLoginUser(),
    logout: useLogoutUser(),
  };
};
