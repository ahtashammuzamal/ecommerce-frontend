import PageHeader from "@/components/admin/PageHeader";
import ProductsTable from "@/components/admin/ProductsTable";
import IconButton from "@/components/common/IconButton";
import { Plus } from "lucide-react";
import ProductForm from "./ProductForm";
import { useState } from "react";
import type { Product } from "@/types";

const ProductsManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setProduct(null);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Products"
          description="Manage your product catalog."
        />
        <IconButton onClick={handleAddProduct} className="cursor-pointer">
          <Plus />
          Add Product
        </IconButton>
      </div>
      <ProductsTable setIsOpen={setIsOpen} setProduct={setProduct} />
      <ProductForm isOpen={isOpen} setIsOpen={setIsOpen} product={product} />
    </>
  );
};
export default ProductsManagement;
