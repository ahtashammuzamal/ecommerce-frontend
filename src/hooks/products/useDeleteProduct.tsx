import { deleteProductApi } from "@/api/products.api";
import { queryKeys } from "@/constant/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>  deleteProductApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.PRODUCT] });
    },
  });
};
export default useDeleteProduct;
