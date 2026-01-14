import PageHeader from "@/components/common/PageHeader";
import AllProducts from "@/components/shop/AllProducts";

const Products = () => {
  return (
    <>
      <PageHeader title={"Shop All"} description={"120 Products"} />
      <AllProducts />
    </>
  );
};
export default Products;
