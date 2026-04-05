import { updateProductApi } from "@/api/products.api";
import { queryKeys } from "@/constant/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProductApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries([queryKeys.PRODUCT]);
      queryClient.invalidateQueries([queryKeys.PRODUCTS, variables.id]);
    },
  });
};
export default useUpdateProduct;
