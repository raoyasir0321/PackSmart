import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addSection,
  updateSection,
  deleteSection,
} from "@/api/services/sectionApi";

export const useSectionMutations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSection,
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]);
    },
  });
};

export const useAddSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSection,
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]);
    },
  });
};

export const useUpdateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateSection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]);
    },
  });
};

export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSection,
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]);
    },
  });
};
