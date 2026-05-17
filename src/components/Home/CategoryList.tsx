import CategoryCard from "./CategoryCard";
import SectionHeader from "./SectionHeader";
import type { Category } from "@/types";
import StateHandler from "../common/StateHandler";
import useCategories from "@/hooks/tanstack/categories/useCategories";

const CategoryList = () => {
  const { data, isPending, isError } = useCategories();

  return (
    <div className="section-spacing">
      <SectionHeader
        title={"Shop by Category"}
        description={"Find exactly what you are looking for"}
        to={"/products"}
        buttonText={"View All Categories"}
      />
      <div className="section-elements-styling">
        <StateHandler
          isLoading={isPending}
          isError={isError}
          isEmpty={!data?.categories?.length}
        >
          {data?.categories.slice(0, 4).map((category: Category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              imageURL={category.imageURL}
              totalProducts={category.products?.length}
              slug={category.slug}
            />
          ))}
        </StateHandler>
      </div>
    </div>
  );
};
export default CategoryList;
