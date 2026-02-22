import { updateCartApi } from "@/api/cart.api";
import { queryKeys } from "@/constant/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartApi,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryKeys.CART] }),
  });
};
