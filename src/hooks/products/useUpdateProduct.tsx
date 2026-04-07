import { updateProductApi } from "@/api/products.api";
import { queryKeys } from "@/constant/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateProductApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.PRODUCT] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.PRODUCTS] });
    },
  });
};
export default useUpdateProduct;
