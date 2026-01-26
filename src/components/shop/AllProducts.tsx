import { MOCK_PRODUCTS } from "@/mock/products";
import { useState } from "react";
import ProductCard from "../common/ProductCard";
import ProductFilters from "./ProductFilters";
import IconButton from "../common/IconButton";
import { SlidersHorizontal } from "lucide-react";
import useWindowSize from "@/hooks/useWindowSize";
import SearchFilter from "./SearchFilter";

const AllProducts = () => {
  const [isActive, setIsActive] = useState(false);
  const { width } = useWindowSize();

  const filtersStyles =
    width > 1024
      ? "w-1/5 "
      : `fixed z-10 top-0 left-0 pt-20 px-8 bg-secondary md:w-1/2 w-4/5 h-screen ${
          isActive ? "block" : "hidden"
        }`;

  return (
    <div className="flex lg:flex-row flex-col py-8 gap-12">
      <div className={filtersStyles}>
        <ProductFilters setIsActive={setIsActive} />
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
        <SearchFilter />
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageURL={product.images[0]}
              title={product.title}
              category={product.category.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default AllProducts;
