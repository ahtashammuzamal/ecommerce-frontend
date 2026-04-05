import { createProductApi } from "@/api/products.api";
import { queryKeys } from "@/constant/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductApi,
    mutationKey: [queryKeys.PRODUCTS],
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryKeys.PRODUCTS] }),
  });
};
export default useCreateProduct;
