import { MOCK_PRODUCTS } from "@/mock/products";
import { Input } from "../ui/input";

const CategoryFilter = () => {
  return (
    <div className="space-y-3">
      <p className="text-primary text-sm font-medium">Category</p>
      <div className="space-y-1">
        {MOCK_PRODUCTS.map((product) => (
          <span key={product.id} className="flex items-center gap-2">
            <Input
              type="checkbox"
              id={product.category.slug}
              className="w-4 h-4"
            />
            <label htmlFor={product.category.slug}>
              {product.category.name}
            </label>
          </span>
        ))}
      </div>
    </div>
  );
};
export default CategoryFilter;
