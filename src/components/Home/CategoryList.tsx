import CategoryCard from "./CategoryCard";
import SectionHeader from "./SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi } from "@/api/categories.api";
import { queryKeys } from "@/constant/query-keys";
import { toast } from "sonner";
import type { Category } from "@/types";

const CategoryList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.CATEGORIES],
    queryFn: () => getCategoriesApi().then((res) => res.data),
  });

  if (isLoading) return <p>Loading ...</p>;

  if (isError) return toast.error("Error loading categories");

  return (
    <div className="section-spacing">
      <SectionHeader
        title={"Shop by Category"}
        description={"Find exactly what you are looking for"}
        to={"/products"}
        buttonText={"View All Categories"}
      />
      <div className="section-elements-styling">
        {data?.categories.slice(0, 4).map((category: Category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            imageURL={category.imageURL}
            totalProducts={category.products?.length}
          />
        ))}
      </div>
    </div>
  );
};
export default CategoryList;
