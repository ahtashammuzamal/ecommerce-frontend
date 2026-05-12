import type { ProductFiltersProps } from "./ProductFilters";
import { getCategoriesApi } from "@/api/categories.api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constant/query-keys";
import { toast } from "sonner";
import type { Category } from "@/types";
import StateHandler from "../common/StateHandler";
import { useEffect } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const CategoryFilter = ({
  filters,
  setFilters,
  setIsActive,
  setSearchParams,
}: ProductFiltersProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.CATEGORIES],
    queryFn: () => getCategoriesApi().then((res) => res.data),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Error loading category filters");
    }
  }, []);

  const selectedCategories = filters.categories
    ? filters.categories.split(",")
    : [];

  const handleCategoryFilter = (slug: string) => {
    const nextCategories = selectedCategories.includes(slug)
      ? selectedCategories.filter((c) => c !== slug)
      : [...selectedCategories, slug];

    setFilters((prev) => ({
      ...prev,
      categories: nextCategories.join(","),
    }));

    setIsActive?.(false);

    if (setSearchParams) {
      const newSearchParams = new URLSearchParams();
      if (nextCategories.length > 0) {
        newSearchParams.set("categories", nextCategories.join(","));
      } else {
        newSearchParams.delete("categories");
      }
      setSearchParams(newSearchParams);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-primary text-sm font-medium">Category</p>
      <div className="space-y-1">
        <StateHandler
          isLoading={isLoading}
          isError={isError}
          isEmpty={!data?.categories.length}
          emptyFallback={<p>No category found</p>}
        >
          {data?.categories.map((category: Category) => (
            <span key={category.id} className="flex items-center gap-2">
              <Checkbox
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => handleCategoryFilter(category.slug)}
                id={category.slug}
                className="w-4 h-4 cursor-pointer"
              />
              <Label
                htmlFor={category.slug}
                className="text-[15px] font-normal cursor-pointer"
              >
                {category.name}
              </Label>
            </span>
          ))}
        </StateHandler>
      </div>
    </div>
  );
};
export default CategoryFilter;
