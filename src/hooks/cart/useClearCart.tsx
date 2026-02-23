import { clearCartApi } from "@/api/cart.api";
import { queryKeys } from "@/constant/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCartApi,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryKeys.CART] }),
  });
};
