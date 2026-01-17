import { useState } from "react";
import { Slider } from "../ui/slider";

const PriceFilter = () => {
  const [range, setRange] = useState([0, 1000]);
  return (
    <div className="space-y-4">
      <p className="text-primary text-sm font-medium">Price Range</p>
      <div className="space-y-3">
        <Slider
          value={range}
          onValueChange={setRange}
          min={0}
          max={1000}
          step={10}
        />
        <div className="flex justify-between">
          <p className="text-sm text-primary">${range[0]}</p>
          <p className="text-sm text-primary">${range[1]}</p>
        </div>
      </div>
    </div>
  );
};
export default PriceFilter;
