import type { CartItem } from "@/types";
import CartItems from "./CartItems";
import EmptyCart from "./EmptyCart";
import OrderSummary from "./OrderSummary";
import { useCart } from "@/hooks/cart/useCart";

type UseCartProps = {
  cartItems?: CartItem[];
  subTotal: number;
  totalCartItems?: number;
};

const UserCart = ({ cartItems, subTotal, totalCartItems }: UseCartProps) => {
  const { data } = useCart();
  return (
    <>
      {data?.totalCartItems ? (
        <div className="py-8 flex md:flex-row flex-col gap-8 justify-between items-start">
          <CartItems className={"md:w-2/3"} cartItems={cartItems} />
          <OrderSummary
            subTotal={subTotal}
            totalCartItems={totalCartItems}
            className="md:w-2/6"
          />
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};
export default UserCart;
