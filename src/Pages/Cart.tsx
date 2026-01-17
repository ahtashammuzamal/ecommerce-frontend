import UserCart from "@/components/cart/UserCart";
import PageHeader from "@/components/common/PageHeader";

const Cart = () => {
  return (
    <>
      <PageHeader title={"Shopping Cart"} description={"10 items"} />
      <UserCart />
    </>
  );
};
export default Cart;
