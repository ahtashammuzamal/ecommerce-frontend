import { getAllProductsApi } from "@/api/products.api";
import { queryKeys } from "@/constant/query-keys";
import { truncateTitle } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";

const ProductsTable = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.PRODUCTS],
    queryFn: () =>
      getAllProductsApi({ order: "asc", limit: 100 }).then((res) => res.data),
  });

  const handleUpdateProduct = (id: number | undefined) => {
    setIsOpen(true);
    
  };

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="mt-8 w-full">
      <table className="w-full text-left border-primary/10 border rounded-lg ">
        <thead className="bg-secondary/30 text-sm text-primary font-medium">
          <tr>
            <th className="px-6 py-3 border-primary/10 border">Product</th>
            <th className="px-6 py-3 border-primary/10 border">Category</th>
            <th className="px-6 py-3 border-primary/10 border">Price</th>
            <th className="px-6 py-3 border-primary/10 border">Stock</th>
            <th className="px-6 py-3 border-primary/10 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.products.map((product) => (
            <tr key={product.id} className="border-b border-primary/10">
              <td className="px-6 py-5 font-medium text-sm text-primary">
                {truncateTitle(product.title, 30)}
              </td>
              <td className="px-6 py-5 font-medium text-sm">
                {product.category?.name}
              </td>
              <td className="px-6 py-5 font-medium text-sm">
                ${product.price}
              </td>
              <td className="px-6 py-5 font-medium text-sm">{product.stock}</td>
              <td className="flex gap-6 px-6 py-5 font-medium text-sm">
                <Edit
                  className="text-primary"
                  size={20}
                  onClick={() => handleUpdateProduct(product.id)}
                />
                <Trash2 className="text-red-500" size={20} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ProductsTable;
