import ProductCard from "../common/ProductCard";
import SectionHeader from "./SectionHeader";

const products = [
  {
    imageURL: "product.jpg",
    title: "Artisan Ceramic Vase",
    category: "Living Room",
    price: "89",
  },
  {
    imageURL: "product.jpg",
    title: "Minimalist Oak Coffee Table",
    category: "Kitchen",
    price: "99",
  },
  {
    imageURL: "product.jpg",
    title: "Brass Pendant Light",
    category: "Bedroom",
    price: "199",
  },
  {
    imageURL: "product.jpg",
    title: "Ceramic Dinner Set",
    category: "Ceramic Tiles",
    price: "129",
  },
];

const ProductsList = () => {
  return (
    <div className="section-spacing">
      <SectionHeader
        title={"Featured Collection"}
        description={"Handpicked favorites from our curators"}
        to={"/shop"}
        buttonText={"View All"}
      />
      <div className="section-elements-styling">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imageURL={product.imageURL}
            title={product.title}
            category={product.category}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};
export default ProductsList;
