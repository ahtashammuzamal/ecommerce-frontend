import { getAllProductsApi, type ProductFiltersType } from "@/api/products.api";
import { queryKeys } from "@/constant/query-keys";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

const useProducts = ({filters}: {filters: ProductFiltersType}) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [queryKeys.PRODUCTS, filters],
    queryFn: () =>
      getAllProductsApi(filters).then((res) => res.data),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Error loading products");
    }
  }, [isError]);

  return {data, isPending, isError};
};
export default useProducts;
