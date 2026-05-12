import { X } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import type React from "react";
import type { ProductFiltersType } from "@/api/products.api";

export type ProductFiltersProps = {
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
  setFilters: React.Dispatch<React.SetStateAction<ProductFiltersType>>;
  filters: ProductFiltersType;
  setSearchParams?: React.Dispatch<React.SetStateAction<URLSearchParams>>;
};

const ProductFilters = ({
  setIsActive,
  filters,
  setFilters,
  setSearchParams
}: ProductFiltersProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <p className="uppercase text-sm font-semibold text-primary">Filters</p>
        <X className="lg:hidden block" onClick={() => setIsActive?.(false)} />
      </div>
      <CategoryFilter
        filters={filters}
        setFilters={setFilters}
        setIsActive={setIsActive}
        setSearchParams={setSearchParams}
      />
      <PriceFilter
        filters={filters}
        setFilters={setFilters}
        setIsActive={setIsActive}
      />
    </div>
  );
};
export default ProductFilters;
