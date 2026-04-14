import { ListRestart } from "lucide-react";
import { Slider } from "../ui/slider";
import type { ProductFiltersProps } from "./ProductFilters";

const MIN_LIMIT = 0;
const MAX_LIMIT = 50000;

const PriceFilter = ({ filters, setFilters }: ProductFiltersProps) => {
  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, minPrice: value[0], maxPrice: value[1] }));
  };

  const min = filters.minPrice ?? MIN_LIMIT;
  const max = filters.maxPrice ?? MAX_LIMIT;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="text-primary text-sm font-medium">Price Range</p>
        <ListRestart
          className="cursor-pointer"
          onClick={() => {
            handlePriceChange([MIN_LIMIT, MAX_LIMIT]);
          }}
        />
      </div>
      <div className="space-y-3">
        <Slider
          className="cursor-pointer"
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
