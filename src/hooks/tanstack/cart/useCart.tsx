import { getUserCartApi } from "@/api/cart.api";
import { queryKeys } from "@/constant/query-keys";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/AuthContext";

export const useCart = () => {
  const { isAuthenticated } = useAuthContext();

  return useQuery({
    queryKey: [queryKeys.CART],
    queryFn: () => getUserCartApi().then((res) => res.data),
    enabled: isAuthenticated,
  });
};
