import { removeFromCartApi } from "@/api/cart.api";
import { queryKeys } from "@/constant/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CART] });
    },
  });
};
