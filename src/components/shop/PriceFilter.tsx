import { Slider } from "../ui/slider";
import type { ProductFiltersProps } from "./ProductFilters";

const PriceFilter = ({ filters, setFilters }: ProductFiltersProps) => {
  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, minPrice: value[0], maxPrice: value[1] }));
  };

  const min = filters.minPrice ?? 0;
  const max = filters.maxPrice ?? 50000;

  return (
    <div className="space-y-4">
      <p className="text-primary text-sm font-medium">Price Range</p>
      <div className="space-y-3">
        <Slider
          value={[min, max]}
          onValueChange={handlePriceChange}
          min={0}
          max={50000}
          step={100}
        />
        <div className="flex justify-between">
          <p className="text-sm text-primary">${min}</p>
          <p className="text-sm text-primary">${max}</p>
        </div>
      </div>
    </div>
  );
};
export default PriceFilter;
