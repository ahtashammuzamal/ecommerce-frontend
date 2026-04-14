import ProductCard from "../common/ProductCard";
import SectionHeader from "./SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constant/query-keys";
import { getAllProductsApi } from "@/api/products.api";
import { toast } from "sonner";
import { useEffect } from "react";
import StateHandler from "../common/StateHandler";

const ProductsList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.PRODUCTS],
    queryFn: () => getAllProductsApi({ limit: 4 }).then((res) => res.data),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Error loading products");
    }
  }, [isError]);

  return (
    <div className="section-spacing">
      <SectionHeader
        title={"Featured Collection"}
        description={"Handpicked favorites from our curators"}
        to={"/products"}
        buttonText={"View All"}
      />
      <div className="section-elements-styling">
        <StateHandler
          isLoading={isLoading}
          isError={isError}
          isEmpty={!data?.products.length}
        >
          {data?.products.slice(0, 4).map((product, index) => (
            <ProductCard
              key={index}
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
  );
};
export default ProductsList;
