import { useGetAllSuggestedProducts } from "../mutations/useSuggestProductsMutation";

export const getSuggestedProducts = () => {
  return {
    suggestedProducts: useGetAllSuggestedProducts(),
  };
};
