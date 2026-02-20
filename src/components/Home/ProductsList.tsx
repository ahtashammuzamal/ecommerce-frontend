import ProductCard from "../common/ProductCard";
import SectionHeader from "./SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constant/query-keys";
import { getAllProductsApi } from "@/api/products.api";
import { toast } from "sonner";

const ProductsList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.PRODUCTS],
    queryFn: () => getAllProductsApi({ limit: 4 }).then((res) => res.data),
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError)
    return (
      <div className="min-h-96">{toast.error("Error loading products")}</div>
    );


  return (
    <div className="section-spacing">
      <SectionHeader
        title={"Featured Collection"}
        description={"Handpicked favorites from our curators"}
        to={"/products"}
        buttonText={"View All"}
      />
      <div className="section-elements-styling">
        {data?.products.slice(0, 4).map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            imageURL={product.images[0]}
            title={product.title}
            category={product.category.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};
export default ProductsList;
