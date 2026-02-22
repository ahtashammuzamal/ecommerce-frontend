import { getUserCartApi } from "@/api/cart.api";
import { queryKeys } from "@/constant/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useCart = () => {
  return useQuery({
    queryKey: [queryKeys.CART],
    queryFn: () => getUserCartApi().then((res) => res.data),
  });
};
