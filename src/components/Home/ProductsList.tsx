import { MOCK_PRODUCTS } from "@/mock/products";
import ProductCard from "../common/ProductCard";
import SectionHeader from "./SectionHeader";

const ProductsList = () => {
  return (
    <div className="section-spacing">
      <SectionHeader
        title={"Featured Collection"}
        description={"Handpicked favorites from our curators"}
        to={"/products"}
        buttonText={"View All"}
      />
      <div className="section-elements-styling">
        {MOCK_PRODUCTS.slice(0, 4).map((product, index) => (
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
