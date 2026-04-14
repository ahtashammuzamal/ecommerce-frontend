import PageHeader from "@/components/common/PageHeader";
import AllProducts from "@/components/shop/AllProducts";
import { useState } from "react";

const Products = () => {
  const [totalProducts, setTotalProducts] = useState<number | undefined>();

  return (
    <>
      <PageHeader
        title={"Shop All"}
        description={`${totalProducts ? totalProducts : 0} Products`}
      />
      <AllProducts setTotalProducts={setTotalProducts} />
    </>
  );
};
export default Products;
