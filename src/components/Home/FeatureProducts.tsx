import ProductCard from "../common/ProductCard";
import SectionHeader from "./SectionHeader";
import StateHandler from "../common/StateHandler";
import useProducts from "@/hooks/tanstack/products/useProducts";

const FeatureProducts = () => {
  const { data, isPending, isError } = useProducts({
    filters: { isFeatured: true },
  });

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
          isLoading={isPending}
          isError={isError}
          isEmpty={!data?.products.length}
        >
          {data?.products?.map((product, index) => (
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
export default FeatureProducts;
