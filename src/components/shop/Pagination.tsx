import type { ProductFiltersType } from "@/api/products.api";
import IconButton from "../common/IconButton";

const Pagination = ({
  totalProducts,
  filters,
  setFilters,
}: {
  totalProducts: number;
  filters: ProductFiltersType;
  setFilters: React.Dispatch<React.SetStateAction<ProductFiltersType>>;
}) => {

  const page = filters.page ?? 1;
  const limit = filters.limit ?? 6;

  const maxPages = Math.ceil(totalProducts / limit);

  const handleNextPage = () => {
    if (page < maxPages) {
      setFilters((prev) => ({ ...prev, page: (prev.page ?? 1) + 1 }));
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setFilters((prev) => ({ ...prev, page: (prev.page ?? 1) - 1 }));
    }
  };

  return (
    <div className="flex items-center justify-between mt-8 border-t border-muted-foreground/20 pt-4">
      <div className="text-muted-foreground">
        <p className="text-sm">
          Page {page} of {maxPages}
        </p>
      </div>
      <div className="flex gap-2">
        <IconButton
          variant="outline"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </IconButton>
        <IconButton
          variant="outline"
          onClick={handleNextPage}
          disabled={page === maxPages}
        >
          Next
        </IconButton>
      </div>
    </div>
  );
};
export default Pagination;
