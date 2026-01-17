import { MOCK_CATEGORIES } from "@/mock/categories";
import CategoryCard from "./CategoryCard";
import SectionHeader from "./SectionHeader";

const CategoryList = () => {
  return (
    <div className="section-spacing">
      <SectionHeader
        title={"Shop by Category"}
        description={"Find exactly what you are looking for"}
        to={"/shop"}
        buttonText={"View All Categories"}
      />
      <div className="section-elements-styling">
        {MOCK_CATEGORIES.slice(0, 4).map((category) => (
          <CategoryCard key={category.id} name={category.name} />
        ))}
      </div>
    </div>
  );
};
export default CategoryList;
