import { MOCK_PRODUCTS } from "@/mock/products";
import type { Product } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImagesSlider from "./ProductImagesSlider";
import QuantityVariable from "../common/QuantityVariable";
import CartButton from "../common/CartButton";

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    const fetchSingleProduct = async () => {
      const foundProduct = MOCK_PRODUCTS.find(
        (product) => product.id === Number(id),
      );

      setProduct(foundProduct ?? null);
    };
    fetchSingleProduct();
  }, [id]);

  return (
    <div className="flex flex-col md:flex-row gap-8 my-8">
      <ProductImagesSlider imageURL={product?.images[0]} />
      <div className="space-y-6">
        <p className="uppercase text-sm">{product?.category.name}</p>
        <h3>{product?.title}</h3>
        <p className="text-2xl text-primary font-bold">${product?.price}</p>
        <p>{product?.description}</p>
        <span className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <p className="text-primary text-sm">In Stock</p>
        </span>
        <div className="flex sm:flex-row flex-col gap-4 ">
          <QuantityVariable />
          <CartButton className="w-auto rounded " />
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
