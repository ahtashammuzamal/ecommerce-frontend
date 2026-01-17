import { X } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

type ProductFiltersProps = {
  setIsActive: (value: boolean) => void;
};

const ProductFilters = ({ setIsActive }: ProductFiltersProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <p className="uppercase text-sm font-semibold text-primary">Filters</p>
        <X className="lg:hidden block" onClick={() => setIsActive(false)} />
      </div>
      <CategoryFilter />
      <PriceFilter />
    </div>
  );
};
export default ProductFilters;
