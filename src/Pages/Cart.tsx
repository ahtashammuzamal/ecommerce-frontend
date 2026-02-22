import UserCart from "@/components/cart/UserCart";
import PageHeader from "@/components/common/PageHeader";
import { useCart } from "@/hooks/cart/useCart";

const Cart = () => {
  const { data } = useCart();
  return (
    <>
      <PageHeader title={"Shopping Cart"} description={`${data?.totalCartItems} items`} />
      <UserCart />
    </>
  );
};
export default Cart;
