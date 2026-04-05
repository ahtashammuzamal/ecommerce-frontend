import PageHeader from "@/components/admin/PageHeader";
import ProductsTable from "@/components/admin/ProductsTable";
import IconButton from "@/components/common/IconButton";
import { Plus } from "lucide-react";
import ProductForm from "./ProductForm";
import { useState } from "react";

const ProductsManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Products"
          description="Manage your product catalog."
        />
        <IconButton onClick={() => setIsOpen(true)} className="cursor-pointer">
          <Plus />
          Add Product
        </IconButton>
      </div>
      <ProductsTable isOpen={isOpen} setIsOpen={setIsOpen}/>
      <ProductForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
export default ProductsManagement;
