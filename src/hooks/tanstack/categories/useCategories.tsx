import { getCategoriesApi } from "@/api/categories.api";
import { queryKeys } from "@/constant/query-keys";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

const useCategories = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: [queryKeys.CATEGORIES],
    queryFn: () => getCategoriesApi().then((res) => res.data),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Error loading categories");
    }
  }, [isError]);

  return { data, isPending, isError };
};
export default useCategories;
