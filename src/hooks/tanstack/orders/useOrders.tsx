import { getUserOrdersApi } from "@/api/orders.api";
import { queryKeys } from "@/constant/query-keys";
import { useQuery } from "@tanstack/react-query";

const useOrders = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: [queryKeys.ORDERS],
    queryFn: () => getUserOrdersApi().then((res) => res.data),
  });
  return { data, isPending, isError };
};

export default useOrders;
