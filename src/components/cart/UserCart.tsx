import CartItems from "./CartItems";
import EmptyCart from "./EmptyCart";
import OrderSummary from "./OrderSummary";
import { useCart } from "@/hooks/cart/useCart";

const UserCart = () => {
  const { data } = useCart();
  return (
    <>
      {data?.totalCartItems ? (
        <div className="py-8 flex md:flex-row flex-col gap-8 justify-between items-start">
          <CartItems className={"md:w-2/3"} />
          <OrderSummary className={"md:w-2/6"} />
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};
export default UserCart;
