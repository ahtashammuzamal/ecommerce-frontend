import { addToCartApi } from "@/api/cart.api";
import { queryKeys } from "@/constant/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCartApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKeys.CART] }),
  });
};
