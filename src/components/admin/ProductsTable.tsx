import { getAllProductsApi } from "@/api/products.api";
import { queryKeys } from "@/constant/query-keys";
import useDeleteProduct from "@/hooks/products/useDeleteProduct";
import { truncateTitle } from "@/lib/utils";
import type { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import StateHandler from "../common/StateHandler";
import { useEffect } from "react";

const ProductsTable = ({
  setIsOpen,
  setProduct,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.PRODUCTS],
    queryFn: () =>
      getAllProductsApi({ order: "desc", limit: 100 }).then((res) => res.data),
  });

  const handleUpdateProduct = async (id: number) => {
    const product = data?.products.find((product) => product.id === id);

    if (product) {
      setProduct(product);
      setIsOpen(true);
    }
  };

  const { mutate } = useDeleteProduct();

  const handleDeleteProduct = async (id: number | undefined) => {
    const isConfirmed = window.confirm("Are you sure to delete this product?");
    if (!isConfirmed) return;

    try {
      mutate(id, {
        onSuccess: () => {
          toast.success("Product successfully deleted");
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching products");
    }
  }, [isError]);

  return (
    <div className="mt-8 w-full">
      <table className="w-full text-left border-primary/10 border rounded-lg ">
        <thead className="bg-secondary/30 text-sm text-primary font-medium border border-primary/10">
          <tr>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <StateHandler
            isLoading={isLoading}
            isEmpty={!data?.products.length}
            isError={isError}
          >
            {data?.products.map((product) => (
              <tr key={product.id} className="border-b border-primary/10">
                <td className="px-6 py-5 font-medium text-sm text-primary">
                  <Link to={`/products/${product.id}`}>
                    {truncateTitle(product.title, 30)}
                  </Link>
                </td>
                <td className="px-6 py-5 font-medium text-sm">
                  {product.category?.name}
                </td>
                <td className="px-6 py-5 font-medium text-sm">
                  ${product.price}
                </td>
                <td className="px-6 py-5 font-medium text-sm">
                  {product.stock}
                </td>
                <td className="flex gap-6 px-6 py-5 font-medium text-sm">
                  <Edit
                    className="text-primary"
                    size={20}
                    onClick={() => handleUpdateProduct(product.id)}
                  />
                  <Trash2
                    className="text-red-500"
                    size={20}
                    onClick={() => handleDeleteProduct(product.id)}
                  />
                </td>
              </tr>
            ))}
          </StateHandler>
        </tbody>
      </table>
    </div>
  );
};
export default ProductsTable;
