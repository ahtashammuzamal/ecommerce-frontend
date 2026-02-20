import { Input } from "../ui/input";
import type { ProductFiltersProps } from "./ProductFilters";
import { getCategoriesApi } from "@/api/categories.api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constant/query-keys";
import { toast } from "sonner";
import type { Category } from "@/types";

const CategoryFilter = ({ filters, setFilters }: ProductFiltersProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.CATEGORIES],
    queryFn: () => getCategoriesApi().then((res) => res.data),
  });

  if (isLoading) return <p>Loading ...</p>;

  if (isError) return toast.error("Error loading categories");

  const selectedCategories = filters.categories
    ? filters.categories.split(",")
    : [];

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: newCategory } = e.target;

    const nextCategories = selectedCategories.includes(newCategory)
      ? selectedCategories.filter((c) => c !== newCategory)
      : [...selectedCategories, newCategory];

    setFilters((prev) => ({
      ...prev,
      categories: nextCategories.join(","),
    }));
  };

  return (
    <div className="space-y-3">
      <p className="text-primary text-sm font-medium">Category</p>
      <div className="space-y-1">
        {data?.categories.map((category: Category) => (
          <span key={category.id} className="flex items-center gap-2">
            <Input
              type="checkbox"
              name={category.slug}
              id={category.slug}
              className="w-4 h-4"
              checked={selectedCategories.includes(category.slug)}
              onChange={handleCategoryFilter}
            />
            <label htmlFor={category.slug}>{category.name}</label>
          </span>
        ))}
      </div>
    </div>
  );
};
export default CategoryFilter;
