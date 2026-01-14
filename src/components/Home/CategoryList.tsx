import CategoryCard from "./CategoryCard";
import SectionHeader from "./SectionHeader";

const productCategories = [
  { name: "Living Room", productsCount: 124 },
  { name: "Bedroom", productsCount: 100 },
  { name: "Kitchen", productsCount: 156 },
  { name: "Office", productsCount: 67 },
];

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
        {productCategories.map((category, index) => (
          <CategoryCard
            key={index}
            name={category.name}
            productsCount={category.productsCount}
          />
        ))}
      </div>
    </div>
  );
};
export default CategoryList;
