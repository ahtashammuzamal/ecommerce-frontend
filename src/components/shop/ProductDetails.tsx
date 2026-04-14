import { useParams } from "react-router-dom";
import ProductImagesSlider from "./ProductImagesSlider";
import CartButton from "../common/CartButton";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constant/query-keys";
import { getSingleProductApi } from "@/api/products.api";
import ProductQuantityVariable from "./ProductQuantityVariable";
import { useEffect, useState } from "react";
import StateHandler from "../common/StateHandler";
import StockDisplayer from "../common/StockDisplayer";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [queryKeys.PRODUCT, id],
    queryFn: () =>
      getSingleProductApi(Number(id)).then((res) => res.data.product),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Error loading product");
    }
  }, [isError]);

  return (
    <StateHandler
      isLoading={isLoading}
      isError={isError}
      loadingFallback={
        <div className="h-112 flex items-center justify-center">
          <Spinner className="size-9" />
        </div>
      }
      errorFallback={
        <div className="h-112 flex items-center justify-center">
          <p>Something went wrong.</p>
        </div>
      }
    >
      <div className="flex flex-col md:flex-row gap-8 my-8">
        <ProductImagesSlider productImages={product?.images} />
        <div className="space-y-6">
          <p className="uppercase text-sm">{product?.category?.name}</p>
          <h3>{product?.title}</h3>
          <p className="text-2xl text-primary font-bold">${product?.price}</p>
          <p>{product?.description}</p>
          <StockDisplayer stock={product?.stock} />
          <div className="flex sm:flex-row flex-col gap-4 ">
            <ProductQuantityVariable
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <CartButton
              className={`w-auto rounded`}
              disabled={product?.stock === 0}
              productId={product?.id}
              quantity={quantity}
            />
          </div>
        </div>
      </div>
    </StateHandler>
  );
};
export default ProductDetails;
