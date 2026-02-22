import { useParams } from "react-router-dom";
import ProductImagesSlider from "./ProductImagesSlider";
import CartButton from "../common/CartButton";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constant/query-keys";
import { getSingleProductApi } from "@/api/products.api";
import ProductQuantityVariable from "./ProductQuantityVariable";
import { useState } from "react";
import { useAddToCart } from "@/hooks/cart/useAddToCart";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.PRODUCT, id],
    queryFn: () => getSingleProductApi(Number(id)).then((res) => res.data),
  });

  const { mutate, isPending } = useAddToCart();

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8 my-8">
      <ProductImagesSlider imageURL={data?.product.images[0]} />
      <div className="space-y-6">
        <p className="uppercase text-sm">{data?.product.category.name}</p>
        <h3>{data?.product.title}</h3>
        <p className="text-2xl text-primary font-bold">
          ${data?.product.price}
        </p>
        <p>{data?.product.description}</p>
        <span className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <p className="text-primary text-sm">In Stock</p>
        </span>
        <div className="flex sm:flex-row flex-col gap-4 ">
          <ProductQuantityVariable
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <CartButton
            className="w-auto rounded"
            isPending={isPending}
            onClick={() => mutate({ productId: Number(id), quantity })}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
