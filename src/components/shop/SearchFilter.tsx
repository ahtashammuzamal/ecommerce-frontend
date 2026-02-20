import { Input } from "../ui/input";
import type { ProductFiltersProps } from "./ProductFilters";

const SearchFilter = ({ filters, setFilters }: ProductFiltersProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  return (
    <Input
      placeholder="Search products here"
      className="border border-primary/20 pl-4 placeholder:text-[16px] text-xl"
      onChange={handleSearchChange}
      value={filters.search || ""}
    />
  );
};
export default SearchFilter;
