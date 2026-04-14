import React, { useEffect, useState, type SetStateAction } from "react";
import ProductCard from "../common/ProductCard";
import ProductFilters from "./ProductFilters";
import IconButton from "../common/IconButton";
import { SlidersHorizontal } from "lucide-react";
import useWindowSize from "@/hooks/useWindowSize";
import SearchFilter from "./SearchFilter";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constant/query-keys";
import { getAllProductsApi, type ProductFiltersType } from "@/api/products.api";
import { toast } from "sonner";
import StateHandler from "../common/StateHandler";

const AllProducts = ({
  setTotalProducts,
}: {
  setTotalProducts: React.Dispatch<SetStateAction<number | undefined>>;
}) => {
  const [isActive, setIsActive] = useState(false);
  const { width } = useWindowSize();

  const [filters, setFilters] = useState<ProductFiltersType>({
    search: "",
    categories: "",
    minPrice: undefined,
    maxPrice: undefined,
    limit: 20,
    page: 1,
    order: "desc",
    sortBy: "createdAt",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.PRODUCTS, filters],
    queryFn: () => getAllProductsApi(filters).then((res) => res.data),
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (data?.products) {
      setTotalProducts(data.products.length);
    }
  });

  useEffect(() => {
    if (isError) {
      toast.error("Error loading products");
    }
  }, [isError]);

  const filtersStyles =
    width > 1024
      ? "w-1/5 "
      : `fixed z-10 top-0 left-0 pt-20 px-8 bg-secondary md:w-1/2 w-4/5 h-screen ${
          isActive ? "block" : "hidden"
        }`;

  return (
    <div className="flex lg:flex-row flex-col py-8 gap-12">
      <div className={filtersStyles}>
        <ProductFilters
          setIsActive={setIsActive}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <div>
        <IconButton
          variant={"outline"}
          onClick={() => setIsActive(!isActive)}
          className="lg:hidden"
        >
          <SlidersHorizontal />
          Filters
        </IconButton>
      </div>
      <div className="lg:w-4/5 w-full space-y-4">
        <SearchFilter filters={filters} setFilters={setFilters} />
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          <StateHandler
            isLoading={isLoading}
            isError={isError}
            isEmpty={!data?.products.length}
          >
            {data?.products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imageURL={product.images[0]}
                title={product.title}
                categoryName={product.category?.name}
                price={product.price}
                stock={product.stock}
              />
            ))}
          </StateHandler>
        </div>
      </div>
    </div>
  );
};
export default AllProducts;
