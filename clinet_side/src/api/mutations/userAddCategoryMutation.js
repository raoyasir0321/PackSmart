// import { useMutation, useQueryClient } from "@tanstack/react-query";
// // import { addCategory, deleteCategory } from "../services/categoryApi";

// export const useAddCategoryMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: addCategory,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["categories"]);
//     },
//   });
// };

// export const useDeleteCategory = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteCategory,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["categories"]);
//     },
//   });
// };
